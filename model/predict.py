import tensorflow as tf
import numpy as np
from PIL import Image
import json

class FruitClassifier:
    def __init__(self, model_path='model/fruit_classifier.h5', class_indices_path='model/class_indices.json'):
        self.model = tf.keras.models.load_model(model_path)
        
        with open(class_indices_path, 'r') as f:
            self.class_indices = json.load(f)
            
        self.classes = {v: k for k, v in self.class_indices.items()}
        
    def preprocess_image(self, image):
        # Resize image
        image = image.resize((224, 224))
        # Convert to array and normalize
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        img_array = tf.expand_dims(img_array, 0)
        img_array = img_array / 255.0
        return img_array
    
    def predict(self, image):
        # Preprocess the image
        processed_image = self.preprocess_image(image)
        
        # Make prediction
        predictions = self.model.predict(processed_image)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get the class name
        predicted_class = self.classes[predicted_class_idx]
        
        return {
            'class': predicted_class,
            'confidence': confidence
        }

# Example usage
if __name__ == "__main__":
    classifier = FruitClassifier()
    image = Image.open('test_apple.jpg')  # Change this to your test image filename if needed
    result = classifier.predict(image)
    print(result) 