from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from model.predict import FruitClassifier

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://fruit-classification-3sft.vercel.app",  # Actual deployed Vercel frontend URL
        "http://localhost:5173"  # Vite dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the classifier
classifier = FruitClassifier()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and convert the uploaded file to PIL Image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Make prediction
    result = classifier.predict(image)
    
    return result

@app.get("/")
async def root():
    return {"message": "Fruit Classifier API is running"} 