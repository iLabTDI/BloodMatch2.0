from flask import Flask, request, jsonify
import json
import os 
from flask_cors import CORS
from Chatbot import find_tag_by_response_in_pattern, get_random_response_by_tag, predict_class, get_response, chatgpt_api_fallback


from capa_1 import capa_1
app = Flask(__name__)
CORS(app)

# Load the intents JSON data
script_dir = os.path.dirname(os.path.abspath(__file__))
intents_path = os.path.join(script_dir, 'intents.json')
with open(intents_path, 'r', encoding="utf-8") as file:
    disease_data = json.load(file)

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    associated_tag = find_tag_by_response_in_pattern(text)
    ints = predict_class(text)
    res = get_response(ints, disease_data)
    
    if ints == associated_tag:
        message = {"answer": res}
        
    elif (associated_tag) and not (ints == associated_tag):
        resB = get_random_response_by_tag(associated_tag, disease_data)
        message = {"answer": resB}
    
    else:
        resC = chatgpt_api_fallback(text)
        message = {"answer": resC}
    
    print("Response:", message)
    return jsonify(message)

@app.route('/status', methods=['POST'])
def get_status():
    text = request.get_json().get("message")
    response = capa_1(text)
    if response == 1:
        message = {"answer": 'Está bien el paciente'}
    elif response == 0:
        message = {"answer": 'Está BAJO su ritmo, necesita revisión'}
    elif response == 2:
        message = {"answer": "Está ALTO su ritmo, necesita revisión"}
    else:
        message = {"answer": "No existe ese registro"}
    print("Response:", message)  # Add this line for debugging
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
