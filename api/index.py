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
    model = YOLO("./best.pt")
    results = model(f"./images/{file.filename}")
    print(results)

    if os.path.exists(f"./images/{file.filename}"):
        os.remove(f"./images/{file.filename}")
    return {"heading": file.filename, "information": "This is information"}


@app.post("/api/chatbot")
async def chatbot(question: str = Body(..., embed=True)):
    print(question)
    path = "jianghc/medical_chatbot"
    device = "cuda" if torch.cuda.is_available() else "cpu"
    tokenizer = GPT2Tokenizer.from_pretrained(path)
    model = GPT2LMHeadModel.from_pretrained(path).to(device)

    prompt_input = (
        "The conversation between human and AI assistant.\n"
        f"[|Human|] {question}\n"
        "[|AI|]"
    )
    sentence = prompt_input.format_map({f"input": "{question}"})
    inputs = tokenizer(sentence, return_tensors="pt").to(device)

    with torch.no_grad():
        beam_output = model.generate(
            **inputs,
            min_new_tokens=1,
            max_length=512,
            num_beams=3,
            repetition_penalty=1.2,
            early_stopping=True,
            eos_token_id=198,
        )
    print(tokenizer.decode(beam_output[0], skip_special_tokens=True))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
