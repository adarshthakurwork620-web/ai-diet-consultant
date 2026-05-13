from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from groq import Groq
import os
import bcrypt
import jwt
import datetime
from datetime import timedelta

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutriai.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'nutriai-secret-key-2024'

from models.user_model import db, User
from models.goal_model import Goal, DailyGoalStatus

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


def get_current_user():
    auth_header = request.headers.get('Authorization', '')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None

    token = auth_header.split(' ', 1)[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return User.query.get(payload.get('user_id'))
    except Exception:
        return None


def get_profile_suggestions(user):
    text = (user.goal or '').lower()
    if 'loss' in text or 'fat' in text:
        return [
            {'title': 'Walk 10,000 Steps', 'target': 'Daily brisk step target', 'goal_type': 'Steps'},
            {'title': 'Eat under 1800 Calories', 'target': 'Maintain calorie deficit', 'goal_type': 'Calories'},
            {'title': 'Drink 3 Liters Water', 'target': 'Hydration first', 'goal_type': 'Water'},
        ]
    if 'gain' in text or 'muscle' in text:
        return [
            {'title': 'High Protein Meals', 'target': 'Add 3 protein servings', 'goal_type': 'Protein'},
            {'title': 'Strength Workout 30 Minutes', 'target': 'Gym or bodyweight session', 'goal_type': 'Exercise'},
            {'title': 'Drink 2.5 Liters Water', 'target': 'Support muscle recovery', 'goal_type': 'Water'},
        ]
    return [
        {'title': 'Drink 3 Liters Water', 'target': 'Stay hydrated all day', 'goal_type': 'Water'},
        {'title': 'Sleep 8 Hours', 'target': 'Rest and recovery', 'goal_type': 'Sleep'},
        {'title': 'Follow Diet Plan', 'target': 'Stick to your meal schedule', 'goal_type': 'Nutrition'},
    ]


def count_daily_completion(user, date, total_goals):
    if total_goals == 0:
        return False
    completed_count = DailyGoalStatus.query.filter_by(user_id=user.id, date=date, completed=True).count()
    return completed_count >= total_goals


def build_goal_summary(user, goals):
    today = datetime.datetime.utcnow().date()
    total_goals = len(goals)
    today_statuses = DailyGoalStatus.query.filter_by(user_id=user.id, date=today).all()
    status_map = {status.goal_id: status for status in today_statuses}
    goals_payload = [goal.to_dict(status_map.get(goal.id)) for goal in goals]
    completed_goals = sum(1 for item in goals_payload if item['completed'])
    progress_pct = int((completed_goals / total_goals) * 100) if total_goals else 0

    streak_days = 0
    for offset in range(0, 30):
        day = today - timedelta(days=offset)
        if count_daily_completion(user, day, total_goals):
            streak_days += 1
        else:
            break

    weekly_summary = []
    for offset in range(6, -1, -1):
        day = today - timedelta(days=offset)
        weekly_summary.append({
            'day': day.strftime('%a'),
            'completed': count_daily_completion(user, day, total_goals),
        })

    days_in_month = today.day
    month_completed = 0
    for offset in range(0, days_in_month):
        day = today - timedelta(days=offset)
        if count_daily_completion(user, day, total_goals):
            month_completed += 1

    monthly_consistency = int((month_completed / days_in_month) * 100) if days_in_month else 0
    quote = 'Build consistency with small wins — every completed goal counts.'
    if progress_pct == 100:
        quote = 'Amazing work! You completed every goal today. Keep the streak alive.'
    elif progress_pct >= 70:
        quote = 'Great momentum today. One more goal to make it perfect!'

    history_items = DailyGoalStatus.query.filter_by(user_id=user.id, completed=True).order_by(DailyGoalStatus.date.desc()).limit(8).all()
    history = [
        {
            'title': item.goal.title,
            'target': item.goal.target,
            'goal_type': item.goal.goal_type,
            'date': item.date.strftime('%b %d'),
        }
        for item in history_items
    ]

    return {
        'goals_payload': goals_payload,
        'summary': {
            'total_goals': total_goals,
            'completed_goals': completed_goals,
            'progress_pct': progress_pct,
            'streak_days': streak_days,
            'weekly_summary': weekly_summary,
            'monthly_consistency': monthly_consistency,
            'quote': quote,
            'suggested_goals': get_profile_suggestions(user),
            'history': history,
        },
    }


@app.route('/api/goals', methods=['GET'])
def get_goals():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    goals = Goal.query.filter_by(user_id=user.id, active=True).order_by(Goal.id.desc()).all()
    payload = build_goal_summary(user, goals)
    return jsonify({
        'goals': payload['goals_payload'],
        'summary': payload['summary'],
    })


@app.route('/api/goals', methods=['POST'])
def add_goal():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.json or {}
    title = (data.get('title') or '').strip()
    target = data.get('target', '').strip()
    goal_type = data.get('goal_type', 'Custom').strip() or 'Custom'

    if not title:
        return jsonify({'error': 'Goal title is required.'}), 400

    goal = Goal(user_id=user.id, title=title, target=target, goal_type=goal_type)
    db.session.add(goal)
    db.session.commit()

    return jsonify({'goal': goal.to_dict()}), 201


@app.route('/api/goals/<int:goal_id>', methods=['PUT'])
def update_goal(goal_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    goal = Goal.query.filter_by(id=goal_id, user_id=user.id).first()
    if not goal:
        return jsonify({'error': 'Goal not found.'}), 404

    data = request.json or {}
    goal.title = (data.get('title') or goal.title).strip()
    goal.target = data.get('target', goal.target).strip()
    goal.goal_type = data.get('goal_type', goal.goal_type).strip() or 'Custom'
    goal.active = data.get('active', goal.active)
    goal.updated_at = datetime.datetime.utcnow()

    db.session.commit()
    return jsonify({'goal': goal.to_dict()}), 200


@app.route('/api/goals/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    goal = Goal.query.filter_by(id=goal_id, user_id=user.id).first()
    if not goal:
        return jsonify({'error': 'Goal not found.'}), 404

    DailyGoalStatus.query.filter_by(user_id=user.id, goal_id=goal.id).delete()
    db.session.delete(goal)
    db.session.commit()

    return jsonify({'message': 'Goal removed successfully.'}), 200


@app.route('/api/goals/<int:goal_id>/toggle', methods=['POST'])
def toggle_goal(goal_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    goal = Goal.query.filter_by(id=goal_id, user_id=user.id, active=True).first()
    if not goal:
        return jsonify({'error': 'Goal not found.'}), 404

    today = datetime.datetime.utcnow().date()
    status = DailyGoalStatus.query.filter_by(user_id=user.id, goal_id=goal.id, date=today).first()
    if not status:
        status = DailyGoalStatus(user_id=user.id, goal_id=goal.id, date=today)

    data = request.json or {}
    if 'completed' in data:
        status.completed = bool(data.get('completed'))
    else:
        status.completed = not status.completed

    status.completed_at = datetime.datetime.utcnow() if status.completed else None
    db.session.add(status)
    db.session.commit()

    return jsonify({'goal_id': goal.id, 'completed': status.completed}), 200


    app.run(debug=True, port=5000)