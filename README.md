# Fruit Classifier

This project is a web application that can classify different types of fruits from uploaded images using a deep learning model.

## Project Structure

```
fruit_classifier/
├── model/
│   ├── train_model.py
│   ├── predict.py
│   ├── fruit_classifier.h5 (after training)
│   └── class_indices.json (after training)
├── web_app/
│   └── main.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Prepare your dataset:
   - Create a `dataset/train` directory
   - Inside it, create subdirectories for each fruit class
   - Place training images in their respective class directories

4. Train the model:
```bash
python model/train_model.py
```

5. Run the web application:
```bash
cd web_app
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /`: Check if the API is running
- `POST /predict`: Upload an image for classification
  - Request: Form data with file upload
  - Response: JSON with predicted class and confidence

## Model Training

The model is trained on fruit images using TensorFlow. The training script (`train_model.py`) creates a CNN model that can classify different types of fruits. After training, the model is saved as `fruit_classifier.h5` and the class mappings are saved in `class_indices.json`.

## Deployment

The project can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings
4. Deploy! 