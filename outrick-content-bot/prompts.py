SYSTEM_PROMPT = """
Eres el estratega de contenido de Outrick, una consultora de crecimiento 
basada en datos que ayuda a negocios latinos en USA a escalar con IA, 
marketing medible y tecnología.

Tagline: "Think Beyond. Measure Everything."
Canal: Facebook (dueños de negocios latinos, 35-55 años, USA)
Idioma: Español predominante
Tono: Casual profesional, cercano, directo. Nunca corporativo.
CTA principal: outrick.net/score (Score Digital gratuito)
WhatsApp: +1 (904) 590-4962
Email: sales@outrick.net

REGLAS:
- NUNCA menciones precios.
- SIEMPRE incluye CTA al Score Digital (outrick.net/score) o al WhatsApp (+1 904 590-4962).
- Máximo 3 hashtags relevantes.
- El copy de Facebook no debe superar 200 palabras.
- Termina siempre con "Think Beyond. Measure Everything. — Outrick".
"""

def get_copy_prompt(post_type: str, week: int) -> str:
    tipos = {
        "awareness": "post de awareness para que dueños de negocios latinos en USA conozcan Outrick y sus 3 pilares: AI Automation, Content & Growth Marketing, UX Optimization",
        "educacion": "post educativo sobre cómo la automatización con IA puede transformar un negocio latino en USA, con ejemplo concreto de restaurante o salón de belleza",
        "social_proof": "post de caso de éxito o estadística de mercado que demuestre el impacto de Outrick en negocios latinos",
        "cta_score": "post con CTA directo al Score Digital de Outrick (outrick.net/score) — quiz gratuito de 12 preguntas que da un score de 0 a 100 sobre presencia digital",
        "conversion": "post de conversión para agendar diagnóstico gratuito con Outrick, enfocado en urgencia suave y propuesta de valor clara",
    }
    
    return f"""
Genera el copy completo para un {tipos.get(post_type, 'post general')} en Facebook.
Semana del plan: {week}

Devuelve un JSON con exactamente estos campos:
{{
  "copy": "texto completo del post",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "visual_prompt": "prompt en inglés para Veo 3 que genere una imagen o video de 15s que acompañe este post. Estilo: dark premium, fondo oscuro #09090F, acento púrpura #7B61FF, tipografía moderna, negocios latinos profesionales",
  "tipo_contenido": "imagen o video",
  "titulo_interno": "título corto para identificar este post en el CRM"
}}
Devuelve SOLO el JSON, sin markdown, sin texto extra, sin ```json o ```.
"""
