import numpy as np
import tensorflow as tf
import random
import nltk
import os
from nltk.stem.lancaster import LancasterStemmer
import json
import pickle
import nltk
nltk.download('punkt')

stemmer = LancasterStemmer()

current_directory = os.path.dirname(_file_)

intents_path = os.path.join(current_directory, "intents.json")
words_path = os.path.join(current_directory, "words.pkl")
classes_path = os.path.join(current_directory, "classes.pkl")
model_path = os.path.join(current_directory, "chatbot_model/chatbot_model")

try:
    with open(words_path, "rb") as words_file:
        words = pickle.load(words_file)
        
    with open(classes_path, "rb") as classes_file:
        classes = pickle.load(classes_file)

    model = tf.keras.layers.TFSMLayer(model_path, call_endpoint='serving_default')

    with open(intents_path) as json_data:
        intents = json.load(json_data)
except FileNotFoundError as e:
    print(f"Error: {e}. Please ensure that the required files exist in the correct locations.")
    exit(1)

def response(user_input):
    user_input_words = nltk.word_tokenize(user_input)
    user_input_words = [stemmer.stem(word.lower()) for word in user_input_words]
    input_bag = [0] * len(words)
    for s in user_input_words:
        for i, w in enumerate(words):
            if w == s:
                input_bag[i] = 1

    input_bag = np.array(input_bag).reshape(1, -1)

    results = model.predict(input_bag)

    result_index = np.argmax(results)

    tag = classes[result_index]

    for intent in intents["intents"]:
        if intent["tag"] == tag:
            response = random.choice(intent["responses"])
            break

    return response