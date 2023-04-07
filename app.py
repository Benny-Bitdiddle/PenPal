from flask import Flask, jsonify, request
from transformers import pipeline
from flask_cors import CORS


app = Flask(__name__)


# Create a summarizer pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

CORS(app)  # Initialize Flask-CORS with your Flask app

CORS(app, origins='https://summarybuddy.netlify.app/')  # Specify allowed origin

# Define a route for the root endpoint
@app.route('/')
def hello():
    return jsonify(message='Hello, World!')

# Define a route for the custom summarization endpoint
@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        # Create a summarizer pipeline
        # Get the input article from the query parameter
        article = request.json.get('article')
        
        # Use the summarizer pipeline to generate a summary
        summary = summarizer(article, max_length=130, min_length=30, do_sample=False)
        
        # Extract the summarized text from the output
        summarized_text = summary[0]['summary_text']
        
        # Return the summarized text as a JSON response
        return jsonify(summary=summarized_text)
    
    except Exception as e:
        # Return an error message if any error occurs
        return jsonify(error=str(e))

if __name__ == '__main__':
    app.run(host="127.0.0.1",port=5000,debug=True)