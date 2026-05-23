import os
import json
import uuid
import requests
from datetime import datetime
import google.generativeai as genai
import resend

from prompts import SYSTEM_PROMPT, get_copy_prompt
from email_template import build_email_html
from sheets import log_post, get_next_post_type

# Configure Gemini & Resend
if "GEMINI_API_KEY" in os.environ:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

if "RESEND_API_KEY" in os.environ:
    resend.api_key = os.environ["RESEND_API_KEY"]

def generate_copy(post_type: str, week: int) -> dict:
    """Generates the Facebook copy and prompts using gemini-2.5-flash."""
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=SYSTEM_PROMPT
    )
    
    prompt = get_copy_prompt(post_type, week)
    print(f"Llamando a Gemini para tipo de contenido: {post_type}")
    response = model.generate_content(prompt)
    
    # Strip potential markdown code fences from response text
    text = response.text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()
    
    try:
        copy_data = json.loads(text)
    except json.JSONDecodeError as e:
        print(f"Error al decodificar JSON de Gemini: {text}")
        raise e
        
    copy_data["tipo_estrategia"] = post_type
    return copy_data

def generate_visual(visual_prompt: str, tipo: str) -> bytes:
    """
    Generates images or 15s videos via the Veo 3 API.
    Provides robust, beautiful fallbacks if VEO3_API_KEY is not configured or in testing environment.
    """
    api_key = os.environ.get("VEO3_API_KEY", "")
    
    # Robust mock/fallback mode to ensure testing runs cleanly
    if not api_key or api_key.startswith("your_") or api_key == "mock":
        print(f"VEO3_API_KEY no detectada. Usando fallback de CDN público para {tipo}...")
        if tipo == "video":
            # Public royalty-free MP4 clip
            url = "https://www.w3schools.com/html/mov_bbb.mp4"
        else:
            # Public high-quality placeholder image
            url = "https://picsum.photos/1080"
            
        try:
            r = requests.get(url, timeout=15)
            r.raise_for_status()
            return r.content
        except Exception as e:
            print(f"Error descargando recurso de prueba: {e}")
            # Absolute hard fallback bytes
            return b"Outrick Mock Visual Bytes"
            
    # Production call to official Veo 3 API
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    if tipo == "video":
        payload = {
            "prompt": visual_prompt,
            "duration_seconds": 15,
            "aspect_ratio": "9:16",  # Reel format
            "style": "cinematic"
        }
        endpoint = "https://api.veo3.ai/v1/generate/video"
    else:
        payload = {
            "prompt": visual_prompt,
            "aspect_ratio": "1:1",   # Feed format
        }
        endpoint = "https://api.veo3.ai/v1/generate/image"

    print(f"Solicitando generación a Veo 3 ({tipo})...")
    response = requests.post(endpoint, json=payload, headers=headers)
    response.raise_for_status()
    return response.content

def send_preview_email(copy_data: dict, post_id: str):
    """Compiles the HTML template and sends the review email via Resend."""
    token = os.environ["SECRET_TOKEN"]
    base_url = os.environ["BASE_URL"].rstrip("/")
    
    review_url = f"{base_url}/review?id={post_id}&token={token}"
    media_url = f"{base_url}/media/{post_id}?token={token}"

    html = build_email_html(
        copy=copy_data["copy"],
        hashtags=copy_data.get("hashtags", []),
        tipo=copy_data.get("tipo_contenido", "imagen"),
        review_url=review_url,
        media_url=media_url,
        titulo=copy_data.get("titulo_interno", "Post Outrick")
    )

    print(f"Enviando correo de previsualización a {os.environ['APPROVAL_EMAIL']}...")
    resend.Emails.send({
        "from": os.environ["FROM_EMAIL"],
        "to": os.environ["APPROVAL_EMAIL"],
        "subject": f"Preview post Outrick — {copy_data.get('titulo_interno', 'Post')}",
        "html": html
    })

def main():
    week = datetime.now().isocalendar()[1]
    
    # 1. State-Based Rotation Logic (Refined)
    post_type = get_next_post_type()
    post_id = str(uuid.uuid4())[:8]

    print(f"════════════════════════════════════════")
    print(f"Generando Post: ID={post_id} | Tipo={post_type} | Semana={week}")
    print(f"════════════════════════════════════════")

    # 2. Generate Copy with Gemini
    copy_data = generate_copy(post_type, week)
    print(f"Copy generado correctamente: '{copy_data.get('titulo_interno')}'")

    # 3. Generate Visual with Veo 3 (or fallback)
    visual_bytes = generate_visual(copy_data["visual_prompt"], copy_data["tipo_contenido"])
    print(f"Visual generado ({copy_data['tipo_contenido']}) - Tamaño: {len(visual_bytes)} bytes")

    # 4. Save to Sheets & Google Drive (Refined)
    log_post(post_id, copy_data, status="pendiente", visual_bytes=visual_bytes)

    # 5. Dispatch email
    send_preview_email(copy_data, post_id)
    print(f"¡Proceso completado con éxito! Correo enviado a {os.environ['APPROVAL_EMAIL']}.")

if __name__ == "__main__":
    main()
