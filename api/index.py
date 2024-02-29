from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from typing import Annotated
import uvicorn
from ultralytics import YOLO
import uuid
from fastapi import Body
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os
from herbalScanner import predict_plant_photo
from predict.botanicalPrediction import BotanicalPre
from storeImf import Imf
from chatbot.predict import response

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IMAGEDIR = "images/"


@app.post("/api/predict")
async def create_upload_file(file: UploadFile = File(...)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
    confidence = 0
    predicted_label = ""
    
    # Segmented Leaf
    # model = YOLO("./best.pt")
    # results = model(f"./images/{file.filename}")
    
    # Kaggle Indian Plant
    # predicted_label, confidence = predict_plant_photo(f"./images/{file.filename}")
    
    #Botanical Garden
    predicted_label = BotanicalPre(f"./images/{file.filename}")

    if os.path.exists(f"./images/{file.filename}"):
        os.remove(f"./images/{file.filename}")
    return {"heading": predicted_label,"confidence":str(confidence), "information": Imf(predicted_label)}


@app.post("/api/chatbot")
async def chatbot(question: str = Body(..., embed=True)):
    answer = response(question)
    return {"answer": answer}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
