from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from groq import Groq
import os
import bcrypt
import jwt
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutriai.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'nutriai-secret-key-2024'

from models.user_model import db, User
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()
    print("✅ Database ready!")

# Groq AI
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# ─── AUTH ROUTES ───────────────────────────────────

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        age = data.get('age')
        weight = data.get('weight')
        height = data.get('height')
        diet_type = data.get('diet_type')
        goal = data.get('goal')

        # Check if user exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered!'}), 400

        # Hash password
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create user
        user = User(
            name=name,
            email=email,
            password=hashed.decode('utf-8'),
            age=age,
            weight=weight,
            height=height,
            diet_type=diet_type,
            goal=goal
        )
        db.session.add(user)
        db.session.commit()

        # Generate token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'message': 'Account created successfully!',
            'token': token,
            'user': user.to_dict()
        }), 201

    except Exception as e:
        print(f"Register Error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found!'}), 404

        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({'error': 'Wrong password!'}), 401

        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'message': 'Login successful!',
            'token': token,
            'user': user.to_dict()
        })

    except Exception as e:
        print(f"Login Error: {e}")
        return jsonify({'error': str(e)}), 500


# ─── AI CHAT ROUTE ─────────────────────────────────

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
        print(f"Chat Error: {e}")
        return jsonify({'error': str(e)}), 500


# ─── HEALTH CHECK ──────────────────────────────────

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running! 🚀'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)