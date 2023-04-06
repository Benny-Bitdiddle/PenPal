# Import FastAPI and other necessary libraries
from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer

# Create a FastAPI app instance
app = FastAPI()
model = torch.load("PenPal/pytorch_model.bin", map_location=torch.device('cpu'))
tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-6-6")


# Define an endpoint to accept input and perform ML inference
@app.post("/predict")
def predict(ml_input):

    # Perform ML inference using your trained model
    # Replace this with your actual ML model code
    input_ids = tokenizer(ml_input, max_length=1024, truncation=True, 
                   padding='max_length', return_tensors='pt').to(device)
    summaries = model.generate(input_ids=input_ids['input_ids'], 
                           attention_mask=input_ids['attention_mask'], 
                           max_length=256)
    decoded_summaries = [tokenizer.decode(s, skip_special_tokens=True, 
                                      clean_up_tokenization_spaces=True) 
                    for s in summaries]

    # Return the prediction as a JSON response
    return {"prediction": decoded_summaries}



