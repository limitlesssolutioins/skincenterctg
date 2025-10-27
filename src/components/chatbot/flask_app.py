import os
from flask import Flask, render_template, request, jsonify, session
from dotenv import load_dotenv # Sigue siendo útil para desarrollo local
import google.generativeai as genai
from datetime import timedelta
import json     # Importado para el webhook de WhatsApp
import requests # Importado para el webhook de WhatsApp
import traceback # Para imprimir tracebacks completos en caso de error

# --- CARGA DE VARIABLES DE ENTORNO Y DEPURACIÓN ---
# Para PythonAnywhere, las variables se establecen principalmente en el archivo WSGI.
# load_dotenv() es más útil para desarrollo local si tienes un archivo .env.

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"Ruta intentada para .env (puede no ser usado en PA si vars están en WSGI): {dotenv_path}")

found_dotenv = load_dotenv(dotenv_path=dotenv_path)
print(f"¿Archivo .env encontrado por load_dotenv() en ruta específica?: {found_dotenv}")

# Leer las variables de entorno
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
WHATSAPP_VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN")
WHATSAPP_ACCESS_TOKEN = os.getenv("WHATSAPP_ACCESS_TOKEN")
WHATSAPP_PHONE_NUMBER_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID")

print(f"GOOGLE_API_KEY obtenido: '{GOOGLE_API_KEY}'")
print(f"SECRET_KEY obtenido: '{SECRET_KEY}'")
print(f"WHATSAPP_VERIFY_TOKEN obtenido: '{WHATSAPP_VERIFY_TOKEN}'")
print(f"WHATSAPP_ACCESS_TOKEN obtenido: '{WHATSAPP_ACCESS_TOKEN}'")
print(f"WHATSAPP_PHONE_NUMBER_ID obtenido: '{WHATSAPP_PHONE_NUMBER_ID}'")

# --- INICIALIZACIÓN DE LA APLICACIÓN FLASK ---
app = Flask(__name__)
from flask_cors import CORS
CORS(app) # Habilitar CORS para toda la aplicación
app.secret_key = SECRET_KEY # Usa la variable leída del entorno

if not app.secret_key:
    print("ALERTA CRÍTICA: SECRET_KEY no está configurada. Las sesiones de Flask NO funcionarán.")
    # Considera un valor por defecto solo para desarrollo local si es absolutamente necesario, pero NUNCA para producción.
    # app.secret_key = "desarrollo_local_inseguro_temporal"

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1) # Duración de la sesión web

# --- CONFIGURACIÓN DEL CLIENTE DE GOOGLE GEMINI ---
try:
    if not GOOGLE_API_KEY:
        raise ValueError("La GOOGLE_API_KEY no se cargó correctamente desde las variables de entorno.")

    genai.configure(api_key=GOOGLE_API_KEY)
    print("Configuración de Google Gemini API (genai.configure) lista.")
except Exception as e:
    print(f"Error CRÍTICO al configurar la API de Google Gemini con genai.configure: {e}")
    print(traceback.format_exc())


# --- INSTRUCCIONES DEL SISTEMA PARA GEMINI ---
SYSTEM_INSTRUCTIONS = """
Eres 'Lia', la asesora virtual de SkinCenter Cartagena, clinica dermatologica integral y spa medico en Cartagena, Colombia. Tu objetivo es orientar a pacientes y visitantes con informacion clara, humana y profesional.

Estilo de comunicacion:
- Mantén la coherencia y el contexto de la conversación, evitando repetir saludos o presentaciones si la conversación ya está en curso.
- Mantente en espanol a menos que el usuario hable en ingles; entonces responde en ese idioma.
- Usa parrafos cortos, listas cuando aporten claridad y un tono cercano pero experto.
- Resume parafraseando antes de ofrecer pasos o recomendaciones.

Pilares de SkinCenter Cartagena:
- Mision: Brindar servicios medicos generales y especializados con talento humano idoneo, tecnologia avanzada, infraestructura confortable y procesos de mejora continua.
- Vision 2028: Ser referencia regional y nacional por calidad, eficiencia y calidez en la atencion dermatologica.
- Valores: servicio, pasion, humildad, autonomia, profesionalismo y respeto.
- Liderazgo medico: Dra. Diana Carolina Carrasquilla Ruiz, dermatologa con experiencia en dermatologia clinica, cosmetica, cirugia dermatologica y terapias laser.

Portafolio resumido (usa solo lo necesario segun la pregunta):
1. Dermatologia clinica: consultas iniciales y de control, reseccion de lesiones, infiltraciones, biopsias, manejo de acne, rosacea, dermatitis, psoriasis, infecciones cutaneas y evaluacion de lunares con dermatoscopia digital y laboratorio de patologia.
2. Dermatologia estetica: toxina botulinica avanzada, rellenos con acido hialuronico, Radiesse, Harmonyca, skinboosters, hilos PDO, tecnologias de microagujas (Nanopore, Dermashine, Radiofixer, Morpheus 8) y luz pulsada intensa.
3. Spa dermatologico: experiencias faciales, capilares, corporales y laser que combinan aparatologia de ultima generacion con tecnicas sensoriales y dermocosmetica profesional.
4. Boutique dermocosmetica: recomendaciones personalizadas de productos para cuidado en casa y acompanamiento post tratamiento.

Lineamientos clave:
- No formulas diagnosticos ni prescribes tratamientos. Si detectas sintomas graves, fiebre, sangrado, alergia aguda o urgencias, pide contactar atencion medica inmediata o acudir a urgencias.
- Para agendar citas o valoraciones, recoge nombre completo, telefono o WhatsApp, correo, motivo de consulta y preferencia de horario; confirma que un asesor continuara el proceso.
- Si la pregunta excede tu conocimiento, indica que un especialista dara seguimiento y comparte los canales de contacto.
- No inventes datos; si algo no esta documentado, dilo abiertamente.
- Nunca compartas precios si no estan publicados; ofrece enviar cotizacion personalizada.

Contactos y horarios:
- Telefonos: +57 (5) 123 4567 y WhatsApp +57 300 123 4567.
- Correo: info@dermatologico.com
- Direccion: Calle 123 # 45-67, Cartagena, Colombia.
- Horario de atencion presencial: lunes a viernes 9:00 a 18:00, sabados 9:00 a 13:00.
- Para WhatsApp comparte https://wa.me/573001234567 cuando el usuario pida hablar con un asesor.

Buenas practicas adicionales:
- Refuerza cuidados preventivos, seguimiento medico continuo y adherencia a indicaciones de los especialistas.
- Recuerda al usuario preparar documentacion clinica previa y llegar con anticipacion a sus citas cuando corresponda.
- Menciona la tecnologia disponible solo si agrega valor a la respuesta.
- Conserva registros breves del motivo de contacto cuando solicites datos para agendar (ejemplo: "Motivo: acne persistente"), pero no pidas informacion sensible innecesaria.
"""

# --- DICCIONARIO GLOBAL PARA HISTORIALES DE CHAT DE WHATSAPP ---
# ADVERTENCIA: Esto se reiniciará si la app Flask se reinicia.
# Para producción persistente, necesitarías una base de datos.
whatsapp_chat_histories = {}

# --- RUTAS PARA EL CHATBOT WEB ---
@app.route("/")
def index():
    return jsonify({"status": "Chatbot API is running"})

@app.route("/api/chat", methods=["POST"])
def chat_api():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No se recibió ningún mensaje."}), 400

    if not GOOGLE_API_KEY:
        print("Error en /api/chat: GOOGLE_API_KEY no está disponible.")
        return jsonify({"error": "Error de configuración del servidor (API Key)."}), 500
    if not app.secret_key:
        print("Error en /api/chat: Flask SECRET_KEY no está configurada.")
        return jsonify({"error": "Error de configuración del servidor (Secret Key)."}), 500

    try:
        session_key_web_history = 'chat_session_history_for_web'
        gemini_model_for_web = genai.GenerativeModel(
            model_name='models/gemini-flash-latest',
            system_instruction=SYSTEM_INSTRUCTIONS
        )

        current_history_dicts = session.get(session_key_web_history, [])
        reconstructed_history_for_web = []
        if current_history_dicts:
            for msg_dict in current_history_dicts:
                parts_content = []
                if isinstance(msg_dict.get("parts"), list) and msg_dict["parts"] and isinstance(msg_dict["parts"][0], dict) and "text" in msg_dict["parts"][0]:
                    parts_content.append(msg_dict["parts"][0]["text"])
                reconstructed_history_for_web.append({"role": msg_dict["role"], "parts": parts_content})

        if not current_history_dicts:
            print("Nueva sesión de chat WEB iniciada.")
            chat_web = gemini_model_for_web.start_chat(history=[])
        else:
            chat_web = gemini_model_for_web.start_chat(history=reconstructed_history_for_web)
            print(f"Sesión de chat WEB continuada con {len(reconstructed_history_for_web)} mensajes.")

        print(f"Enviando a Gemini (Web): {user_message}")
        response_web = chat_web.send_message(user_message)

        raw_bot_response_web = response_web.text.strip()
        print(f"Respuesta de Gemini (Web Cruda): {raw_bot_response_web}")

        cleaned_bot_response_web = raw_bot_response_web.replace("*", "")
        print(f"Respuesta de Gemini (Web Limpia): {cleaned_bot_response_web}")

        updated_history_for_session_web = []
        for content in chat_web.history:
            parts_text_list = []
            if content.parts:
                for part in content.parts:
                    if hasattr(part, 'text') and part.text:
                         parts_text_list.append(part.text)
            final_parts_text = " ".join(parts_text_list) if parts_text_list else ""
            updated_history_for_session_web.append({"role": content.role, "parts": [{"text": final_parts_text}]})

        session[session_key_web_history] = updated_history_for_session_web
        session.modified = True

        return jsonify({"response": cleaned_bot_response_web})

    except Exception as e:
        print(f"Error CRÍTICO en /api/chat: {e}")
        print(traceback.format_exc())
        return jsonify({"error": "Hubo un error muy inesperado al procesar tu mensaje (web). Intenta de nuevo."}), 500

# --- RUTA PARA EL WEBHOOK DE WHATSAPP ---
@app.route('/webhook/whatsapp', methods=['GET', 'POST'])
def whatsapp_webhook():
    if request.method == 'GET':
        mode = request.args.get('hub.mode')
        challenge = request.args.get('hub.challenge')
        token = request.args.get('hub.verify_token')
        if mode == 'subscribe' and token == WHATSAPP_VERIFY_TOKEN:
            print("Webhook de WhatsApp VERIFICADO.")
            return challenge, 200
        else:
            print(f"FALLO en verificación de Webhook de WhatsApp. Token recibido: '{token}', Esperado: '{WHATSAPP_VERIFY_TOKEN}'")
            return 'Verification token mismatch or mode is not subscribe', 403

    elif request.method == 'POST':
        data = request.get_json()
        print("Datos recibidos en Webhook de WhatsApp:", json.dumps(data, indent=2))
        bot_reply_text = "Lo siento, no pude procesar tu mensaje en este momento." # Mensaje de error por defecto
        user_wa_id = None # Inicializar por si no se puede extraer

        try:
            if data.get('object') == 'whatsapp_business_account':
                if data.get('entry') and data['entry'][0].get('changes') and \
                   data['entry'][0]['changes'][0].get('value') and \
                   data['entry'][0]['changes'][0]['value'].get('messages') and \
                   data['entry'][0]['changes'][0]['value']['messages'][0]:

                    message_object = data['entry'][0]['changes'][0]['value']['messages'][0]
                    if message_object.get('type') == 'text':
                        user_wa_id = message_object.get('from')
                        user_text = message_object['text'].get('body')

                        if not user_wa_id or not user_text:
                            print("Error: No se pudo extraer user_wa_id o user_text del mensaje de WhatsApp.")
                            return 'OK', 200 # Responder OK para evitar reintentos de WhatsApp

                        print(f"Mensaje de WhatsApp de {user_wa_id}: {user_text}")

                        gemini_model_for_whatsapp = genai.GenerativeModel(
                            model_name='models/gemini-flash-latest',
                            system_instruction=SYSTEM_INSTRUCTIONS
                        )

                        current_user_history_dicts = whatsapp_chat_histories.get(user_wa_id, [])
                        reconstructed_history_for_gemini = []
                        if current_user_history_dicts:
                            for msg_dict in current_user_history_dicts:
                                parts_content = []
                                if isinstance(msg_dict.get("parts"), list) and msg_dict["parts"] and isinstance(msg_dict["parts"][0], dict) and "text" in msg_dict["parts"][0]:
                                    parts_content.append(msg_dict["parts"][0]["text"])
                                reconstructed_history_for_gemini.append({"role": msg_dict["role"], "parts": parts_content})

                        if not current_user_history_dicts:
                            print(f"Nueva sesión de chat de Gemini para WhatsApp User ID: {user_wa_id}")
                            chat_instance_wa = gemini_model_for_whatsapp.start_chat(history=[])
                        else:
                            print(f"Continuando sesión de chat de Gemini para WhatsApp User ID: {user_wa_id} con {len(reconstructed_history_for_gemini)} mensajes.")
                            chat_instance_wa = gemini_model_for_whatsapp.start_chat(history=reconstructed_history_for_gemini)

                        print(f"Enviando a Gemini (WhatsApp - {user_wa_id}): {user_text}")
                        gemini_response = chat_instance_wa.send_message(user_text)

                        raw_bot_response_wa = gemini_response.text.strip()
                        print(f"Respuesta de Gemini (WhatsApp Cruda - {user_wa_id}): {raw_bot_response_wa}")

                        bot_reply_text = raw_bot_response_wa.replace("*", "")
                        print(f"Respuesta de Gemini (WhatsApp Limpia - {user_wa_id}): {bot_reply_text}")

                        updated_history_for_dict = []
                        for content in chat_instance_wa.history:
                            parts_text_list = []
                            if content.parts:
                                for part in content.parts:
                                    if hasattr(part, 'text') and part.text:
                                         parts_text_list.append(part.text)
                            final_parts_text = " ".join(parts_text_list) if parts_text_list else ""
                            updated_history_for_dict.append({"role": content.role, "parts": [{"text": final_parts_text}]})
                        whatsapp_chat_histories[user_wa_id] = updated_history_for_dict

            if user_wa_id: # Solo enviar si tenemos un destinatario
                send_whatsapp_message(user_wa_id, bot_reply_text)
            else:
                print("No se pudo determinar el user_wa_id para enviar respuesta de WhatsApp.")

        except Exception as e:
            print(f"Error CRÍTICO procesando mensaje de WhatsApp en /webhook/whatsapp: {e}")
            print(traceback.format_exc())
            if user_wa_id: # Intentar enviar un mensaje de error genérico si es posible
                send_whatsapp_message(user_wa_id, "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.")

        return 'OK', 200

# --- FUNCIÓN PARA ENVIAR MENSAJES DE WHATSAPP ---
def send_whatsapp_message(to_wa_id, message_text):
    if not all([WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID]) or \
       WHATSAPP_ACCESS_TOKEN == "TOKEN_DE_ACCESO_PENDIENTE" or \
       WHATSAPP_PHONE_NUMBER_ID == "ID_NUMERO_TELEFONO_PENDIENTE":
        print("Error en send_whatsapp_message: Variables de WhatsApp (token o ID de número) no configuradas o son placeholders. No se puede enviar mensaje.")
        return

    api_version = "v19.0"
    url = f"https://graph.facebook.com/{api_version}/{WHATSAPP_PHONE_NUMBER_ID}/messages"

    headers = {
        "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_wa_id,
        "type": "text",
        "text": {"body": message_text},
    }

    print(f"Intentando enviar a WhatsApp API. URL: {url}, Headers: {{...}}, Payload: {json.dumps(payload)}") # Omitir headers en log por brevedad y seguridad del token

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        print(f"Respuesta CRUDA de API WhatsApp - Status: {response.status_code}, Contenido: {response.text}")
        response.raise_for_status()
        print(f"Mensaje ENVIADO EXITOSAMENTE a WhatsApp ({to_wa_id}): {message_text}")
        try:
            print(f"Respuesta JSON de API WhatsApp al enviar (si es JSON): {response.json()}")
        except ValueError:
            print(f"Respuesta de API WhatsApp al enviar (no JSON, pero exitosa): {response.text}")

    except requests.exceptions.HTTPError as http_err:
        print(f"Error HTTP enviando mensaje de WhatsApp a {to_wa_id}: {http_err}")
        if http_err.response is not None:
             print(f"Respuesta HTTPError - Status: {http_err.response.status_code}, Contenido: {http_err.response.text}")
    except requests.exceptions.Timeout:
        print(f"Timeout enviando mensaje de WhatsApp a {to_wa_id} (después de 10 segundos)")
    except requests.exceptions.RequestException as req_err:
        print(f"Error de Requests (no HTTP) enviando mensaje de WhatsApp a {to_wa_id}: {req_err}")
    except Exception as e:
        print(f"Error INESPERADO en send_whatsapp_message: {e}")
        print(traceback.format_exc())

# La siguiente línea es para desarrollo local, PythonAnywhere no la usa para producción.
# if __name__ == "__main__":
#     app.run(debug=True)
