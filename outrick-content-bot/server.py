import os
import requests
import subprocess
from flask import Flask, request, jsonify, render_template_string, Response, send_file, redirect, url_for
from sheets import update_post_status, get_post_data

app = Flask(__name__)

def verify_token(token: str) -> bool:
    return token == os.environ.get("SECRET_TOKEN")

def publish_to_facebook(copy_data: dict, visual_bytes: bytes) -> str:
    """Publishes copy and binary media to Meta Graph API for the Outrick Facebook Page."""
    page_id = os.environ["META_PAGE_ID"]
    access_token = os.environ["META_ACCESS_TOKEN"]

    tipo = copy_data.get("tipo_contenido", "imagen")
    hashtags = " ".join(copy_data.get("hashtags", []))
    full_text = f"{copy_data.get('copy', '')}\n\n{hashtags}"

    if tipo == "video":
        upload_url = f"https://graph-video.facebook.com/v19.0/{page_id}/videos"
        files = {"source": ("video.mp4", visual_bytes, "video/mp4")}
        data = {
            "description": full_text,
            "access_token": access_token
        }
        r = requests.post(upload_url, files=files, data=data)
    else:
        photo_url = f"https://graph.facebook.com/v19.0/{page_id}/photos"
        files = {"source": ("image.jpg", visual_bytes, "image/jpeg")}
        data = {
            "caption": full_text,
            "access_token": access_token
        }
        r = requests.post(photo_url, files=files, data=data)

    r.raise_for_status()
    return r.json().get("id", "published")

# ==================== HTML TEMPLATE STRINGS ====================

DASHBOARD_TEMPLATE = """
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Outrick Content Hub | Hub de Aprobación</title>
  <style>
    body {
      background-color: #09090F;
      color: #E2E8F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      width: 100%;
      background-color: #151522;
      border: 1px solid #252538;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
      margin: 20px;
      box-sizing: border-box;
    }
    .header {
      border-bottom: 1px solid #252538;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand {
      color: #7B61FF;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      margin: 6px 0 0;
      color: #FFFFFF;
    }
    .meta-info {
      font-size: 13px;
      color: #7A7F8E;
      margin-top: 4px;
    }
    .media-card {
      background: #09090F;
      border: 1px solid #252538;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 24px;
      text-align: center;
    }
    .media-card img, .media-card video {
      width: 100%;
      height: auto;
      max-height: 450px;
      display: block;
      object-fit: contain;
      background: #000;
    }
    .copy-card {
      background-color: #09090F;
      border: 1px solid #252538;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .copy-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: #E2E8F0;
      white-space: pre-wrap;
    }
    .hashtags {
      margin-top: 12px;
      font-size: 13px;
      font-weight: 600;
      color: #7B61FF;
    }
    .btn-group {
      display: flex;
      gap: 16px;
    }
    .btn {
      flex: 1;
      padding: 16px 20px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      border: none;
      box-sizing: border-box;
    }
    .btn-primary {
      background-color: #7B61FF;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(123, 97, 255, 0.4);
    }
    .btn-primary:hover {
      background-color: #6346FF;
      box-shadow: 0 6px 20px rgba(123, 97, 255, 0.6);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background-color: transparent;
      color: #A0AEC0;
      border: 1px solid #252538;
    }
    .btn-secondary:hover {
      background-color: #1F1F33;
      color: #FFFFFF;
      transform: translateY(-1px);
    }
    .footer {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #252538;
      text-align: center;
      font-size: 11px;
      color: #7A7F8E;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">OUTRICK CONTENT HUB</div>
      <h2 class="title">{{ copy_data.titulo_interno }}</h2>
      <div class="meta-info">Estrategia: {{ copy_data.tipo_estrategia }} | Formato: {{ copy_data.tipo_contenido }}</div>
    </div>

    <div class="media-card">
      {% if copy_data.tipo_contenido == 'video' %}
        <video controls>
          <source src="{{ media_url }}" type="video/mp4">
          Tu navegador no soporta reproducción de video.
        </video>
      {% else %}
        <img src="{{ media_url }}" alt="Creative Image">
      {% endif %}
    </div>

    <div class="copy-card">
      <p class="copy-text">{{ copy_data.copy }}</p>
      <p class="hashtags">{{ hashtags_str }}</p>
    </div>

    <div class="btn-group">
      <!-- Form to Approve and Publish via POST -->
      <form action="/publish" method="POST" style="flex: 1;">
        <input type="hidden" name="id" value="{{ copy_data.post_id }}">
        <input type="hidden" name="token" value="{{ token }}">
        <button type="submit" class="btn btn-primary">Aprobar y Publicar</button>
      </form>

      <!-- Form to Reject and Regenerate via POST -->
      <form action="/regenerate" method="POST" style="flex: 1;">
        <input type="hidden" name="id" value="{{ copy_data.post_id }}">
        <input type="hidden" name="token" value="{{ token }}">
        <button type="submit" class="btn btn-secondary">Rechazar y Regenerar</button>
      </form>
    </div>

    <div class="footer">
      Think Beyond. Measure Everything. — Outrick &middot; sales@outrick.net
    </div>
  </div>
</body>
</html>
"""

RESPONSE_TEMPLATE = """
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Outrick Content Hub | Estado</title>
  <style>
    body {
      background-color: #09090F;
      color: #E2E8F0;
      font-family: -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      text-align: center;
    }
    .container {
      max-width: 500px;
      background-color: #151522;
      border: 1px solid #252538;
      border-radius: 16px;
      padding: 48px 32px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
      margin: 20px;
    }
    .icon {
      font-size: 56px;
      margin-bottom: 24px;
      display: inline-block;
    }
    .icon-success { color: #10B981; }
    .icon-process { color: #7B61FF; }
    h2 {
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 12px;
      color: #FFFFFF;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #A0AEC0;
      margin: 0 0 24px;
    }
    .brand-footer {
      font-size: 11px;
      color: #7A7F8E;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    {% if success %}
      <span class="icon icon-success">✓</span>
      <h2>¡Publicado con éxito!</h2>
      <p>El post se ha publicado exitosamente en tu página de Facebook de Outrick.<br>ID del post: {{ fb_post_id }}</p>
    {% else %}
      <span class="icon icon-process">↻</span>
      <h2>Regenerando Contenido</h2>
      <p>Hemos rechazado el post previo y comenzado la generación de una propuesta completamente nueva. Recibirás un nuevo correo en unos minutos.</p>
    {% endif %}
    <div class="brand-footer">THINK BEYOND. MEASURE EVERYTHING.</div>
  </div>
</body>
</html>
"""

# ==================== CONTROLLER ROUTES ====================

@app.route("/review")
def review():
    post_id = request.args.get("id")
    token = request.args.get("token")

    if not post_id or not token:
        return "Parámetros faltantes", 400

    if not verify_token(token):
        return "Token inválido", 403

    try:
        # We only fetch metadata here to render the dashboard quickly (media downloads lazily in /media)
        copy_data, _ = get_post_data(post_id)
        
        base_url = os.environ.get("BASE_URL", "").rstrip("/")
        media_url = f"{base_url}/media/{post_id}?token={token}"
        hashtags_str = " ".join(copy_data.get("hashtags", []))

        return render_template_string(
            DASHBOARD_TEMPLATE,
            copy_data=copy_data,
            hashtags_str=hashtags_str,
            media_url=media_url,
            token=token
        )
    except Exception as e:
        return f"Error cargando dashboard de revisión: {str(e)}", 500

@app.route("/media/<post_id>")
def media_proxy(post_id):
    token = request.args.get("token")

    if not verify_token(token):
        return "Acceso denegado", 403

    try:
        copy_data, visual_bytes = get_post_data(post_id)
        if not visual_bytes:
            return "Contenido multimedia no encontrado", 404

        tipo = copy_data.get("tipo_contenido", "imagen")
        mime_type = "video/mp4" if tipo == "video" else "image/jpeg"

        # Serve visual bytes with appropriate MIME header directly from memory
        return Response(
            visual_bytes,
            mimetype=mime_type,
            headers={
                "Cache-Control": "public, max-age=86400",
                "Content-Length": len(visual_bytes)
            }
        )
    except Exception as e:
        return f"Error sirviendo archivo multimedia: {str(e)}", 500

@app.route("/publish", methods=["POST"])
def publish():
    post_id = request.form.get("id")
    token = request.form.get("token")

    if not verify_token(token):
        return "Token inválido", 403

    try:
        # Download both metadata and the full file bytes
        copy_data, visual_bytes = get_post_data(post_id)
        
        # Post to Meta Facebook Page API
        print(f"Publicando post {post_id} en Facebook...")
        fb_post_id = publish_to_facebook(copy_data, visual_bytes)
        print(f"Publicado con éxito. FB ID: {fb_post_id}")
        
        # Update row to publicado
        update_post_status(post_id, status="publicado", fb_post_id=fb_post_id)

        return render_template_string(RESPONSE_TEMPLATE, success=True, fb_post_id=fb_post_id)
    except Exception as e:
        return f"Error durante la publicación a Facebook: {str(e)}", 500

@app.route("/regenerate", methods=["POST"])
def regenerate():
    post_id = request.form.get("id")
    token = request.form.get("token")

    if not verify_token(token):
        return "Token inválido", 403

    try:
        # Reject current post in Sheets
        update_post_status(post_id, status="rechazado")
        
        # Spawns main.py in the background to immediately trigger fresh content creation
        print("Disparando regeneración automática...")
        subprocess.Popen(["python", "main.py"])
        print("Proceso de generación iniciado en background.")

        return render_template_string(RESPONSE_TEMPLATE, success=False)
    except Exception as e:
        return f"Error al regenerar contenido: {str(e)}", 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
