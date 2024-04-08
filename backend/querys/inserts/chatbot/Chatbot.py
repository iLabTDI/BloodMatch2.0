import random
import json
import pickle
import numpy as np
import os
import sys
import nltk
import openai
from unidecode import unidecode
# Set the encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

from nltk.stem import WordNetLemmatizer #Para pasar las palabras a su forma raíz

#Para crear la red neuronal
from keras.models import load_model

lemmatizer = WordNetLemmatizer()

#Para no tener problemas con la carpeta del archivo 
script_dir = os.path.dirname(os.path.abspath(__file__))
intents_path = os.path.join(script_dir, 'intents.json')

with open(intents_path, 'r', encoding="utf-8") as file:
    intents = json.load(file)


words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.h5')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    max_index = np.where(res == np.max(res))[0][0]
    category = classes[max_index]
    return category

def get_response(tag, intents_json):
    list_of_intents = intents_json['intents']
    
    for intent in list_of_intents:
        if intent['tag'] == tag:
            response_list = intent['responses']
            if response_list:
                print("tag", tag)
                return random.choice(response_list) 
            else:
                return "I'm sorry, I don't have a response for that tag."
    print("tag", tag)
    return "I'm sorry, I'm not familiar with that tag."


#Detectar respuestas erróneas 
with open(intents_path, 'r', encoding="utf-8") as file:
    disease_data = json.load(file)

def find_tag_by_response_in_pattern(input_response):
    for intent in disease_data['intents']:
        for pattern in intent['patterns']:
            if all(unidecode(word.lower()) in unidecode(pattern.lower()) for word in input_response.split()) or unidecode(input_response.lower()) in unidecode(pattern.lower()):
                return intent['tag']
    return None

def get_random_response_by_tag(tag, disease_data):
    for intent in disease_data['intents']:
        if intent['tag'] == tag and 'responses' in intent:
            return random.choice(intent['responses'])
    return None

#API
openai.api_key = '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'
def chatgpt_api_fallback(input_text):
    model = "gpt-3.5-turbo"
    response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides information on medical topics."},
                {"role": "user", "content": input_text},])
    return response['choices'][0]['message']['content'].strip()