from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')

        response = client.chat.completions.create(
            model='llama-3.1-8b-instant',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are NutriAI, a friendly expert AI diet consultant. Give personalized practical diet advice. Keep responses concise and helpful. Use emojis occasionally. Focus on Indian food options when relevant.'
                },
                {
                    'role': 'user',
                    'content': user_message
                }
            ]
        )

        ai_text = response.choices[0].message.content
        return jsonify({'reply': ai_text})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)