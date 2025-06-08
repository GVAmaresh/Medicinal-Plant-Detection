# Medicinal Plant Detection
This project is a web application that detects medicinal plants using YOLOv8, served via a FastAPI REST API, and displayed through a modern Next.js frontend.

## Tech Stack
> Frontend: Next.js (React + Tailwind)
> 
> Backend: FastAPI (Python)
>
> Model: YOLOv8 (Ultralytics)
>
> API: REST-based image upload and prediction

## Features
- Upload plant images via the web interface.

- Real-time object detection using a fine-tuned YOLOv8 model.

- Instant result display with confidence scores.

- Responsive, user-friendly interface.


## Installation

Backend Setup
```bash
git clone https://github.com/GVAmaresh/Medicinal-Plant-Detection
cd Medicinal-Plant-Detection
cd api
python -r requirements.txt
python index.py
```

2. Frontend Setup 
```bash
npm i
npm run dev
```

Go to http://localhost:3000 in your browser.

### Directory Structure
```
medicinal-plant-detector/
├── api/        # FastAPI + YOLOv8 model
├── app/       # Next.js application
└── README.md
```
