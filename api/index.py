from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from typing import Annotated
import uvicorn
import shutil
from ultralytics import YOLO
import uuid
from fastapi import Body
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os
# from api.delete.herbalScanner import predict_plant_photo
from predict.botanicalPrediction import BotanicalPre
# from api.delete.storeImf import Imf
from chatbot.predict import response
from predict.storeBotanicalImf import BotanicalInf

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
    information = ""
    
    # Segmented Leaf
    # model = YOLO("./best.pt")
    # results = model(f"./images/{file.filename}")
    
    # Kaggle Indian Plant
    # predicted_label, confidence = predict_plant_photo(f"./images/{file.filename}")
    # information = Imf(predicted_label)
    
    #Botanical Garden
    predicted_label = BotanicalPre(f"./images/{file.filename}")
    print(predicted_label)
    if "Please" not in predicted_label:
        information = BotanicalInf(predicted_label)
        print(information)

    if os.path.exists(f"./images/{file.filename}"):
        os.remove(f"./images/{file.filename}")
    try:
        shutil.rmtree("./runs")
        # print(f"Folder './runs' deleted successfully.")
    except Exception as e:
        print(f"Error deleting folder './runs': {e}")
    return {"heading": predicted_label, "confidence": str(confidence), "information": information }

@app.post("/api/chatbot")
async def chatbot(question: str = Body(..., embed=True)):
    answer = response(question)
    return {"answer": answer}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
