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
             system_prompt = """You are a helpful coding tutor. 
             1. If the user provides code, explain it in simple, educational terms.
             2. If the user asks for a 'Challenge', generate a short, fun coding task related to their current code to test their understanding.
             3. If the user asks for a 'Trace', provide a line-by-line simulation of the code execution in a markdown table format: | Line | Variable Changes | Logic/Explanation |.
             4. If the user asks for a 'Refactor', provide an improved version of the code with brief explanations of the changes.
             Keep responses concise, educational, and encouraging."""
             
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
