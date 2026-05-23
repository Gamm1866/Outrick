def build_email_html(copy: str, hashtags: list, tipo: str, review_url: str, media_url: str, titulo: str) -> str:
    hashtags_str = " ".join(hashtags)
    
    # In emails, raw video tags are highly incompatible. We show a beautiful preview card.
    if tipo == "video":
        media_tag = f"""
        <div style="position:relative;background:#151522;border:1px solid #252538;border-radius:12px;padding:48px 24px;text-align:center;margin:16px 0;">
          <div style="display:inline-block;background:#7B61FF;color:#ffffff;width:56px;height:56px;line-height:60px;border-radius:50%;font-size:24px;margin-bottom:12px;text-align:center;">▶</div>
          <p style="margin:0;font-size:15px;font-weight:600;color:#FFFFFF;">Reel / Video de 15s (Veo 3)</p>
          <p style="margin:4px 0 0;font-size:12px;color:#7A7F8E;">Haz clic abajo para reproducir el video en el Hub de Outrick</p>
        </div>
        """
    else:
        media_tag = f"""
        <div style="margin:16px 0;border-radius:12px;overflow:hidden;border:1px solid #252538;background:#151522;">
          <img src="{media_url}" alt="Preview Outrick" style="width:100%;height:auto;display:block;" />
        </div>
        """

    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Preview de post Outrick</title>
    </head>
    <body style="margin:0;padding:0;background-color:#09090F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:20px auto;background-color:#151522;border:1px solid #252538;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        <!-- Header -->
        <tr>
          <td style="background-color:#7B61FF;padding:24px 32px;text-align:left;">
            <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:4px;color:#CCCCFF;text-transform:uppercase;">OUTRICK HUBCONTENT</p>
            <h1 style="margin:4px 0 0;font-size:22px;font-weight:800;color:#FFFFFF;line-height:1.2;">Nuevo Post Generado</h1>
          </td>
        </tr>
        
        <!-- Content Area -->
        <tr>
          <td style="padding:32px;color:#E2E8F0;">
            <p style="margin:0 0 16px;font-size:14px;color:#A0AEC0;text-transform:uppercase;letter-spacing:1px;">Título Interno: <strong style="color:#FFFFFF;">{titulo}</strong></p>
            
            {media_tag}
            
            <div style="background-color:#09090F;border:1px solid #252538;border-radius:12px;padding:20px;margin-bottom:28px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#F0F0F5;white-space:pre-line;">{copy}</p>
              <p style="margin:16px 0 0;font-size:13px;font-weight:600;color:#7B61FF;letter-spacing:0.5px;">{hashtags_str}</p>
            </div>
            
            <!-- Safe Button to Dashboard -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center">
                  <a href="{review_url}" target="_blank" style="display:block;background-color:#7B61FF;color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:8px;box-shadow:0 4px 12px rgba(123,97,255,0.3);text-align:center;">
                    Revisar y Administrar Post
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #252538;text-align:center;">
            <p style="margin:0;font-size:12px;color:#7A7F8E;">Think Beyond. Measure Everything. — Outrick</p>
            <p style="margin:6px 0 0;font-size:11px;color:#4A4F5E;">sales@outrick.net · outrick.net</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """
