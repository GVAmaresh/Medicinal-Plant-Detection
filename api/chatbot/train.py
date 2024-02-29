import numpy as np
import tensorflow as tf
import random
import nltk
from nltk.stem.lancaster import LancasterStemmer
import json
import pickle
import warnings

import nltk
nltk.download('punkt')
warnings.filterwarnings("ignore")


stemmer = LancasterStemmer()


with open("./intents.json") as json_data:
    intents = json.load(json_data)

words = []
classes = []
documents = []
ignore_words = ["?"]

for intent in intents["intents"]:
    for pattern in intent["patterns"]:
        w = nltk.word_tokenize(pattern)
        words.extend(w)
        documents.append((w, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])


words = [stemmer.stem(w.lower()) for w in words if w not in ignore_words]
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))

training = []
output = []

output_empty = [0] * len(classes)

for doc in documents:
    bag = []
    pattern_words = doc[0]
    pattern_words = [stemmer.stem(word.lower()) for word in pattern_words]
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1

    training.append([bag, output_row])

random.shuffle(training)

train_x = np.array([item[0] for item in training])
train_y = np.array([item[1] for item in training])


tf.compat.v1.reset_default_graph()

input_data = tf.keras.Input(shape=(len(train_x[0]),), dtype=tf.float32)
output_data = tf.keras.Input(shape=(len(train_y[0]),), dtype=tf.float32)

hidden_layer1 = tf.keras.layers.Dense(8, activation=tf.nn.relu)(input_data)
hidden_layer2 = tf.keras.layers.Dense(8, activation=tf.nn.relu)(hidden_layer1)
output_layer = tf.keras.layers.Dense(len(train_y[0]), activation=tf.nn.softmax)(
    hidden_layer2
)

model = tf.keras.Model(inputs=input_data, outputs=output_layer)

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

model.fit(train_x, train_y, epochs=200, batch_size=8)

with open("model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

with open("classes.pkl", "wb") as classes_file:
    pickle.dump(np.array(classes), classes_file)

with open("words.pkl", "wb") as words_file:
    pickle.dump(np.array(words), words_file)
