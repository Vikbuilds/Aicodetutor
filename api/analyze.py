from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        data = json.loads(body)

        code = data.get('code', '')
        messages = data.get('messages', [])

        if not code and not messages:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "No code or messages provided"}).encode())
            return

        if not messages:
            messages = [{"role": "user", "content": f"Analyze this code:\n{code}"}]

        try:
            api_key = os.environ.get("GROQ_API_KEY")
            if api_key:
                from groq import Groq
                client = Groq(api_key=api_key)

                system_prompt = "You are a helpful coding tutor. Explain the code in simple terms, point out any errors, and suggest improvements. If the user asks follow-up questions, answer them in the context of the provided code. Keep responses concise and educational."
                full_messages = [{"role": "system", "content": system_prompt}] + messages

                response = client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=full_messages
                )
                analysis = response.choices[0].message.content
            else:
                analysis = "## Explanation\n(Mock) Groq API Key missing. Please set GROQ_API_KEY in Vercel environment variables."

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"analysis": analysis}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
