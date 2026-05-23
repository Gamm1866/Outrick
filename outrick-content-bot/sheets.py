import os
import json
from datetime import datetime
import io
import gspread
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload

HEADERS = [
    "post_id", "timestamp", "tipo_estrategia", "tipo_contenido", 
    "titulo_interno", "copy", "hashtags", "drive_file_id", "status", "fb_post_id"
]

POST_TYPES = ["awareness", "educacion", "social_proof", "cta_score", "conversion"]

def get_credentials():
    creds_json = os.environ["GOOGLE_SHEETS_CREDENTIALS"]
    creds_dict = json.loads(creds_json)
    SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
    ]
    return Credentials.from_service_account_info(creds_dict, scopes=SCOPES)

def get_sheets_client():
    return gspread.authorize(get_credentials())

def get_drive_service():
    return build('drive', 'v3', credentials=get_credentials())

def initialize_sheet():
    """Ensure spreadsheet has correct headers."""
    client = get_sheets_client()
    sheet_id = os.environ["GOOGLE_SHEETS_ID"]
    spreadsheet = client.open_by_key(sheet_id)
    worksheet = spreadsheet.sheet1
    
    # Check if headers exist
    values = worksheet.get_all_values()
    if not values or len(values) == 0:
        worksheet.append_row(HEADERS)
    else:
        # Check if existing headers match
        current_headers = values[0]
        if current_headers != HEADERS:
            # If empty sheet but has some generic values, overwrite first row
            if len(values) == 1 and all(x == "" for x in values[0]):
                worksheet.update('A1', [HEADERS])
    return worksheet

def get_next_post_type() -> str:
    """Checks the last post type in the sheet and rotates sequentially."""
    try:
        worksheet = initialize_sheet()
        records = worksheet.get_all_records()
        if not records:
            return POST_TYPES[0]
            
        last_record = records[-1]
        last_strategy = last_record.get("tipo_estrategia")
        
        if last_strategy in POST_TYPES:
            idx = POST_TYPES.index(last_strategy)
            next_strategy = POST_TYPES[(idx + 1) % len(POST_TYPES)]
            return next_strategy
        else:
            return POST_TYPES[0]
    except Exception as e:
        print(f"Error determining state-based rotation: {e}")
        # Fallback to week number rotation
        week = datetime.now().isocalendar()[1]
        return POST_TYPES[week % len(POST_TYPES)]

def upload_to_drive(file_name: str, file_bytes: bytes, mime_type: str) -> str:
    """Uploads visual assets to Google Drive under the designated folder."""
    try:
        drive_service = get_drive_service()
        folder_id = os.environ.get("GOOGLE_DRIVE_FOLDER_ID")
        
        file_metadata = {'name': file_name}
        if folder_id:
            file_metadata['parents'] = [folder_id]
            
        media = MediaIoBaseUpload(io.BytesIO(file_bytes), mimetype=mime_type, resumable=True)
        file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        return file.get('id')
    except Exception as e:
        print(f"Error uploading visual to Google Drive: {e}")
        raise e

def download_from_drive(file_id: str) -> bytes:
    """Downloads files securely from Google Drive using their unique ID."""
    try:
        drive_service = get_drive_service()
        request = drive_service.files().get_media(fileId=file_id)
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
        return fh.getvalue()
    except Exception as e:
        print(f"Error downloading from Google Drive: {e}")
        raise e

def log_post(post_id: str, copy_data: dict, status: str = "pendiente", visual_bytes: bytes = None):
    """Logs the post metadata in Sheets and the binary media asset in Drive."""
    try:
        worksheet = initialize_sheet()
        
        # Determine extension and MIME type
        tipo_cont = copy_data.get("tipo_contenido", "imagen")
        ext = "mp4" if tipo_cont == "video" else "jpg"
        mime_type = "video/mp4" if tipo_cont == "video" else "image/jpeg"
        file_name = f"outrick_post_{post_id}.{ext}"
        
        drive_file_id = ""
        if visual_bytes:
            print(f"Subiendo creativo a Google Drive: {file_name}")
            drive_file_id = upload_to_drive(file_name, visual_bytes, mime_type)
            print(f"Subido con éxito. ID: {drive_file_id}")
            
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        row_data = [
            post_id,
            timestamp,
            copy_data.get("tipo_estrategia", "awareness"),
            copy_data.get("tipo_contenido", "imagen"),
            copy_data.get("titulo_interno", "Sin titulo"),
            copy_data.get("copy", ""),
            json.dumps(copy_data.get("hashtags", [])),
            drive_file_id,
            status,
            "" # fb_post_id
        ]
        
        worksheet.append_row(row_data)
        print(f"Log de post {post_id} registrado en Google Sheets.")
    except Exception as e:
        print(f"Error en log_post: {e}")
        raise e

def get_post_data(post_id: str):
    """Retrieves copy_data dictionary and the raw binary bytes from Google Drive."""
    try:
        worksheet = initialize_sheet()
        records = worksheet.get_all_records()
        
        target_row = None
        for record in records:
            if str(record.get("post_id")) == str(post_id):
                target_row = record
                break
                
        if not target_row:
            raise ValueError(f"No se encontró el post con ID {post_id} en Google Sheets.")
            
        copy_data = {
            "post_id": target_row.get("post_id"),
            "tipo_estrategia": target_row.get("tipo_estrategia"),
            "tipo_contenido": target_row.get("tipo_contenido"),
            "titulo_interno": target_row.get("titulo_interno"),
            "copy": target_row.get("copy"),
            "hashtags": json.loads(target_row.get("hashtags") or "[]"),
            "drive_file_id": target_row.get("drive_file_id")
        }
        
        file_id = target_row.get("drive_file_id")
        visual_bytes = None
        if file_id:
            print(f"Descargando archivo {file_id} desde Google Drive...")
            visual_bytes = download_from_drive(file_id)
            
        return copy_data, visual_bytes
    except Exception as e:
        print(f"Error en get_post_data: {e}")
        raise e

def update_post_status(post_id: str, status: str, fb_post_id: str = ""):
    """Updates the status and fb_post_id column in the Google Sheet matching the post_id."""
    try:
        worksheet = initialize_sheet()
        records = worksheet.get_all_records()
        
        row_num = None
        # 1-indexed row number (header is row 1, so row indexing starts at 2)
        for idx, record in enumerate(records):
            if str(record.get("post_id")) == str(post_id):
                row_num = idx + 2
                break
                
        if not row_num:
            raise ValueError(f"No se encontró el post con ID {post_id} para actualizar.")
            
        # Find column indexes
        status_col = HEADERS.index("status") + 1
        fb_col = HEADERS.index("fb_post_id") + 1
        
        worksheet.update_cell(row_num, status_col, status)
        if fb_post_id:
            worksheet.update_cell(row_num, fb_col, fb_post_id)
            
        print(f"Estado de post {post_id} actualizado a {status} en Google Sheets.")
    except Exception as e:
        print(f"Error en update_post_status: {e}")
        raise e
