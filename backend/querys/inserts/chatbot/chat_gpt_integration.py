import requests

def obtener_respuesta_chat_gpt(pregunta):
    url = "https://api.openai.com/v1/completions"
    api_key = "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"

    payload = {
        "model": "text-davinci-002",
        "prompt": pregunta,
        "max_tokens": 100
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["text"].strip()
    except Exception as e:
        print(f"Error al obtener respuesta de ChatGPT: {e}")
        return "Lo siento, no pude encontrar una respuesta en este momento."
