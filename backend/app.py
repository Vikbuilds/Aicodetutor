from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Groq Client
from groq import Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/')
def home():
    return jsonify({"message": "AI Coding Tutor Backend Running"})

@app.route('/analyze', methods=['POST'])
def analyze_code():
    data = request.json
    
    # Support both legacy 'code' only and new 'messages' format
    code = data.get('code', '')
    messages = data.get('messages', [])
    
    if not code and not messages:
        return jsonify({"error": "No code or messages provided"}), 400
    
    # If no history yet, start with the code analysis prompt
    if not messages:
        messages = [
            {"role": "user", "content": f"Analyze this code:\n{code}"}
        ]
    
    # AI Logic
    try:
        if os.getenv("GROQ_API_KEY"):
             system_prompt = "You are a helpful coding tutor. Explain the code in simple terms, point out any errors, and suggest improvements. If the user asks follow-up questions, answer them in the context of the provided code. Keep responses concise and educational."
             
             # Prepend system prompt to the messages list
             full_messages = [{"role": "system", "content": system_prompt}] + messages

             response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=full_messages
            )
             analysis = response.choices[0].message.content
        else:
            analysis = "## Explanation\n(Mock) Groq API Key missing. Please check .env file."

        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
