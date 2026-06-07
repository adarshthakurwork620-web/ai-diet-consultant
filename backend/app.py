from flask import Flask, request, jsonify
from flask_cors import CORS
from models.user_model import (
    db, User, HealthProfile, MedicalHistory, Lifestyle,
    Streak, Food, MealLog, WaterLog, WeightLog,
    DietPlan, ChatHistory, AIRecommendation, ExerciseLog,
    Notification, AuditLog
)
from datetime import datetime, date, timedelta
import bcrypt
import jwt
import os
import uuid
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ─── CONFIG ───
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutriai.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'nutriai-secret-2025')

db.init_app(app)

# Groq client
groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))

# ─── CREATE ALL TABLES ───
with app.app_context():
    db.create_all()
    print("✅ All tables created!")

# ─── HELPERS ───
def get_token(req):
    auth = req.headers.get('Authorization', '')
    return auth.replace('Bearer ', '') if auth.startswith('Bearer ') else None

def verify_token(token):
    try:
        return jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except:
        return None

def get_current_user(req):
    token = get_token(req)
    if not token:
        return None
    payload = verify_token(token)
    if not payload:
        return None
    return User.query.filter_by(id=payload['user_id'], is_deleted=False).first()

def calc_bmi(weight, height_cm):
    if not weight or not height_cm:
        return None
    h = height_cm / 100
    return round(weight / (h * h), 1)

def update_streak(user):
    streak = user.streak
    if not streak:
        streak = Streak(user_id=user.id, current_streak=1, longest_streak=1,
                       last_active=date.today(), total_days=1)
        db.session.add(streak)
    else:
        today = date.today()
        last = streak.last_active
        if last == today:
            pass  # Already active today
        elif last == today - timedelta(days=1):
            streak.current_streak += 1
            streak.total_days += 1
            if streak.current_streak > streak.longest_streak:
                streak.longest_streak = streak.current_streak
        else:
            streak.current_streak = 1
            streak.total_days += 1
        streak.last_active = today
    db.session.commit()

def log_audit(user_id, action, table_name='', record_id=''):
    try:
        log = AuditLog(
            user_id=user_id,
            action=action,
            table_name=table_name,
            record_id=record_id,
            ip_address=request.remote_addr,
            user_agent=request.headers.get('User-Agent', '')[:200]
        )
        db.session.add(log)
        db.session.commit()
    except:
        pass

# ════════════════════════════════════════
#  HEALTH CHECK
# ════════════════════════════════════════
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'Backend is running! 🚀', 'db': 'connected', 'version': '2.0'})


# ════════════════════════════════════════
#  AUTH — REGISTER
# ════════════════════════════════════════
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    name     = data.get('name', '').strip()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not name or not email or not password:
        return jsonify({'error': 'Name, email and password required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Hash password
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    # Create user
    user = User(
        id       = str(uuid.uuid4()),
        name     = name,
        email    = email,
        password = hashed,
        gender   = data.get('gender'),
        city     = data.get('city'),
    )
    db.session.add(user)
    db.session.flush()  # get user.id

    # Create health profile
    weight = data.get('weight')
    height = data.get('height')
    bmi    = calc_bmi(weight, height)

    profile = HealthProfile(
        user_id        = user.id,
        height         = height,
        current_weight = weight,
        target_weight  = data.get('target_weight'),
        bmi            = bmi,
        activity_level = data.get('activity_level', 'moderate'),
        fitness_goal   = data.get('goal', 'weight_loss'),
        diet_type      = data.get('diet_type', 'vegetarian'),
        daily_cal_goal = data.get('daily_cal_goal', 1800),
        protein_goal   = data.get('protein_goal', 90),
        carb_goal      = data.get('carb_goal', 250),
        fat_goal       = data.get('fat_goal', 60),
        water_goal     = data.get('water_goal', 2.5),
    )
    db.session.add(profile)

    # Create medical history (empty)
    medical = MedicalHistory(user_id=user.id)
    db.session.add(medical)

    # Create lifestyle (empty)
    lifestyle = Lifestyle(user_id=user.id)
    db.session.add(lifestyle)

    # Create streak
    streak = Streak(
        user_id        = user.id,
        current_streak = 1,
        longest_streak = 1,
        last_active    = date.today(),
        total_days     = 1,
        goal_progress  = 0.0,
    )
    db.session.add(streak)

    # Initial weight log
    if weight:
        wlog = WeightLog(user_id=user.id, weight=weight, bmi=bmi, log_date=date.today())
        db.session.add(wlog)

    # Initial water log
    wlog2 = WaterLog(user_id=user.id, glasses=0, ml=0, water_date=date.today())
    db.session.add(wlog2)

    # Welcome notification
    notif = Notification(
        user_id   = user.id,
        noti_type = 'welcome',
        title     = '🎉 Welcome to NutriAI!',
        message   = f'Namaste {name}! Your AI diet journey starts now. Set up your profile to get personalized plans!'
    )
    db.session.add(notif)

    db.session.commit()

    # Audit log
    log_audit(user.id, 'register', 'users', user.id)

    # Generate JWT
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'message': 'Registration successful!',
        'token': token,
        'user': {
            'id':        user.id,
            'name':      user.name,
            'email':     user.email,
            'goal':      profile.fitness_goal,
            'diet_type': profile.diet_type,
            'weight':    weight,
            'height':    height,
            'bmi':       bmi,
        }
    }), 201


# ════════════════════════════════════════
#  AUTH — LOGIN
# ════════════════════════════════════════
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email, is_deleted=False).first()
    if not user or not bcrypt.checkpw(password.encode(), user.password.encode()):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Update last login
    user.last_login = datetime.utcnow()

    # Update streak
    update_streak(user)

    db.session.commit()
    log_audit(user.id, 'login', 'users', user.id)

    profile = user.health_profile
    streak  = user.streak

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'message': 'Login successful!',
        'token': token,
        'user': {
            'id':             user.id,
            'name':           user.name,
            'email':          user.email,
            'goal':           profile.fitness_goal if profile else '',
            'diet_type':      profile.diet_type if profile else '',
            'weight':         profile.current_weight if profile else None,
            'height':         profile.height if profile else None,
            'bmi':            profile.bmi if profile else None,
            'daily_cal_goal': profile.daily_cal_goal if profile else 1800,
            'water_goal':     profile.water_goal if profile else 2.5,
            'streak':         streak.current_streak if streak else 0,
            'longest_streak': streak.longest_streak if streak else 0,
            'goal_progress':  streak.goal_progress if streak else 0,
        }
    })


# ════════════════════════════════════════
#  PROFILE — GET & UPDATE
# ════════════════════════════════════════
@app.route('/api/profile', methods=['GET'])
def get_profile():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    profile   = user.health_profile
    medical   = user.medical_history
    lifestyle = user.lifestyle
    streak    = user.streak

    return jsonify({
        'user':      user.to_dict(),
        'profile':   profile.to_dict() if profile else {},
        'medical':   medical.to_dict() if medical else {},
        'lifestyle': lifestyle.to_dict() if lifestyle else {},
        'streak':    streak.to_dict() if streak else {},
    })


@app.route('/api/profile', methods=['PUT'])
def update_profile():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    # Update user basic info
    if 'name'  in data: user.name  = data['name']
    if 'phone' in data: user.phone = data['phone']
    if 'city'  in data: user.city  = data['city']
    user.updated_at = datetime.utcnow()

    # Update health profile
    profile = user.health_profile
    if profile:
        if 'weight'         in data:
            old_weight = profile.current_weight
            profile.current_weight = data['weight']
            profile.bmi = calc_bmi(data['weight'], profile.height)
            # Log weight change
            wlog = WeightLog(
                user_id  = user.id,
                weight   = data['weight'],
                bmi      = profile.bmi,
                log_date = date.today()
            )
            db.session.add(wlog)
        if 'height'         in data: profile.height         = data['height']
        if 'target_weight'  in data: profile.target_weight  = data['target_weight']
        if 'activity_level' in data: profile.activity_level = data['activity_level']
        if 'fitness_goal'   in data: profile.fitness_goal   = data['fitness_goal']
        if 'diet_type'      in data: profile.diet_type      = data['diet_type']
        if 'daily_cal_goal' in data: profile.daily_cal_goal = data['daily_cal_goal']
        if 'water_goal'     in data: profile.water_goal     = data['water_goal']
        profile.updated_at = datetime.utcnow()

    db.session.commit()
    log_audit(user.id, 'update_profile', 'users', user.id)

    return jsonify({'message': 'Profile updated!', 'bmi': profile.bmi if profile else None})


# ════════════════════════════════════════
#  DASHBOARD STATS
# ════════════════════════════════════════
@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    today   = date.today()
    profile = user.health_profile
    streak  = user.streak

    # Today's meals
    meals_today = MealLog.query.filter_by(
        user_id=user.id, meal_date=today, is_deleted=False
    ).all()

    total_cal     = sum(m.calories for m in meals_today)
    total_protein = sum(m.protein for m in meals_today)
    total_carbs   = sum(m.carbs for m in meals_today)
    total_fat     = sum(m.fat for m in meals_today)

    # Today's water
    water_today = WaterLog.query.filter_by(
        user_id=user.id, water_date=today
    ).first()

    # Latest weight
    latest_weight = WeightLog.query.filter_by(
        user_id=user.id
    ).order_by(WeightLog.log_date.desc()).first()

    # Unread notifications
    notifs = Notification.query.filter_by(
        user_id=user.id, is_read=False, is_deleted=False
    ).order_by(Notification.created_at.desc()).limit(5).all()

    # AI Recommendation
    ai_rec = AIRecommendation.query.filter_by(
        user_id=user.id, is_read=False
    ).order_by(AIRecommendation.created_at.desc()).first()

    cal_goal  = profile.daily_cal_goal if profile else 1800
    prot_goal = profile.protein_goal if profile else 90

    return jsonify({
        'user': {
            'id':       user.id,
            'name':     user.name,
            'email':    user.email,
            'goal':     profile.fitness_goal if profile else '',
            'diet_type':profile.diet_type if profile else '',
        },
        'streak': streak.to_dict() if streak else {},
        'today': {
            'date':          str(today),
            'calories':      total_cal,
            'cal_goal':      cal_goal,
            'cal_pct':       round((total_cal / cal_goal) * 100) if cal_goal else 0,
            'protein':       round(total_protein, 1),
            'protein_goal':  prot_goal,
            'carbs':         round(total_carbs, 1),
            'fat':           round(total_fat, 1),
            'water_glasses': water_today.glasses if water_today else 0,
            'water_ml':      water_today.ml if water_today else 0,
            'water_goal':    profile.water_goal if profile else 2.5,
        },
        'meals':        [m.to_dict() for m in meals_today],
        'latest_weight': latest_weight.weight if latest_weight else None,
        'bmi':          profile.bmi if profile else None,
        'notifications': [n.to_dict() for n in notifs],
        'ai_tip':       ai_rec.to_dict() if ai_rec else None,
    })


# ════════════════════════════════════════
#  MEALS — LOG & GET
# ════════════════════════════════════════
@app.route('/api/meals', methods=['GET'])
def get_meals():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    meal_date = request.args.get('date', str(date.today()))
    try:
        meal_date = datetime.strptime(meal_date, '%Y-%m-%d').date()
    except:
        meal_date = date.today()

    meals = MealLog.query.filter_by(
        user_id=user.id, meal_date=meal_date, is_deleted=False
    ).order_by(MealLog.created_at.asc()).all()

    return jsonify({
        'date':  str(meal_date),
        'meals': [m.to_dict() for m in meals],
        'totals': {
            'calories': sum(m.calories for m in meals),
            'protein':  round(sum(m.protein for m in meals), 1),
            'carbs':    round(sum(m.carbs for m in meals), 1),
            'fat':      round(sum(m.fat for m in meals), 1),
        }
    })


@app.route('/api/meals', methods=['POST'])
def log_meal():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    meal = MealLog(
        id        = str(uuid.uuid4()),
        user_id   = user.id,
        meal_type = data.get('meal_type', 'snack'),
        food_name = data.get('food_name', ''),
        quantity  = data.get('quantity', 1),
        calories  = data.get('calories', 0),
        protein   = data.get('protein', 0),
        carbs     = data.get('carbs', 0),
        fat       = data.get('fat', 0),
        tag       = data.get('tag', 'healthy'),
        meal_date = date.today(),
        meal_time = datetime.now().strftime('%I:%M %p'),
        notes     = data.get('notes', ''),
    )
    db.session.add(meal)

    # Auto AI recommendation based on nutrition
    profile = user.health_profile
    if profile:
        meals_today = MealLog.query.filter_by(
            user_id=user.id, meal_date=date.today(), is_deleted=False
        ).all()
        total_protein = sum(m.protein for m in meals_today) + meal.protein

        if total_protein < profile.protein_goal * 0.5:
            rec = AIRecommendation(
                user_id  = user.id,
                rec_type = 'nutrition',
                message  = f'Your protein intake is low ({round(total_protein)}g). Try adding paneer, dal, or eggs to your next meal!'
            )
            db.session.add(rec)

    db.session.commit()
    log_audit(user.id, 'log_meal', 'meal_logs', meal.id)

    return jsonify({'message': 'Meal logged!', 'meal': meal.to_dict()}), 201


@app.route('/api/meals/<meal_id>', methods=['DELETE'])
def delete_meal(meal_id):
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    meal = MealLog.query.filter_by(id=meal_id, user_id=user.id).first()
    if not meal:
        return jsonify({'error': 'Meal not found'}), 404

    meal.is_deleted = True
    db.session.commit()
    return jsonify({'message': 'Meal deleted!'})


# ════════════════════════════════════════
#  WATER — GET & UPDATE
# ════════════════════════════════════════
@app.route('/api/water', methods=['GET'])
def get_water():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    today = date.today()
    water = WaterLog.query.filter_by(user_id=user.id, water_date=today).first()

    profile   = user.health_profile
    water_goal = profile.water_goal if profile else 2.5

    return jsonify({
        'glasses':   water.glasses if water else 0,
        'ml':        water.ml if water else 0,
        'water_goal': water_goal,
        'goal_glasses': 8,
        'pct':       round((water.glasses / 8) * 100) if water else 0,
    })


@app.route('/api/water', methods=['POST'])
def update_water():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data    = request.get_json()
    glasses = data.get('glasses', 0)
    today   = date.today()

    water = WaterLog.query.filter_by(user_id=user.id, water_date=today).first()
    if water:
        water.glasses    = glasses
        water.ml         = glasses * 250
        water.updated_at = datetime.utcnow()
    else:
        water = WaterLog(
            user_id    = user.id,
            glasses    = glasses,
            ml         = glasses * 250,
            water_date = today
        )
        db.session.add(water)

    # Notification if goal reached
    profile = user.health_profile
    if glasses >= 8:
        notif = Notification(
            user_id   = user.id,
            noti_type = 'water',
            title     = '💧 Hydration Goal Reached!',
            message   = 'Amazing! You\'ve completed your daily water intake goal!'
        )
        db.session.add(notif)

    db.session.commit()
    return jsonify({
        'message': 'Water updated!',
        'glasses': glasses,
        'ml':      glasses * 250,
        'pct':     round((glasses / 8) * 100),
    })


# ════════════════════════════════════════
#  WEIGHT — LOG & HISTORY
# ════════════════════════════════════════
@app.route('/api/weight', methods=['GET'])
def get_weight():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    logs = WeightLog.query.filter_by(
        user_id=user.id
    ).order_by(WeightLog.log_date.desc()).limit(30).all()

    profile = user.health_profile

    return jsonify({
        'current_weight': profile.current_weight if profile else None,
        'target_weight':  profile.target_weight if profile else None,
        'bmi':            profile.bmi if profile else None,
        'history':        [l.to_dict() for l in logs],
    })


@app.route('/api/weight', methods=['POST'])
def log_weight():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data   = request.get_json()
    weight = data.get('weight')
    if not weight:
        return jsonify({'error': 'Weight required'}), 400

    profile = user.health_profile
    bmi = calc_bmi(weight, profile.height if profile else None)

    wlog = WeightLog(
        user_id  = user.id,
        weight   = weight,
        bmi      = bmi,
        log_date = date.today(),
        notes    = data.get('notes', '')
    )
    db.session.add(wlog)

    if profile:
        profile.current_weight = weight
        profile.bmi = bmi

        # Update goal progress
        if profile.target_weight and profile.current_weight:
            streak = user.streak
            if streak:
                initial = wlog  # first weight log
                first_log = WeightLog.query.filter_by(
                    user_id=user.id
                ).order_by(WeightLog.log_date.asc()).first()

                if first_log and first_log.weight != profile.target_weight:
                    total_needed = abs(first_log.weight - profile.target_weight)
                    achieved     = abs(first_log.weight - weight)
                    progress     = min((achieved / total_needed) * 100, 100) if total_needed else 0
                    streak.goal_progress = round(progress, 1)

    db.session.commit()
    log_audit(user.id, 'log_weight', 'weight_logs', wlog.id)

    return jsonify({
        'message': 'Weight logged!',
        'weight':  weight,
        'bmi':     bmi,
    }), 201


# ════════════════════════════════════════
#  AI CHAT
# ════════════════════════════════════════
@app.route('/api/chat', methods=['POST'])
def chat():
    user = get_current_user(request)
    data = request.get_json()
    message = data.get('message', '').strip()

    if not message:
        return jsonify({'error': 'Message required'}), 400

    # Build user context for AI
    context = ''
    if user:
        profile = user.health_profile
        if profile:
            context = f"""
User Profile:
- Name: {user.name}
- Goal: {profile.fitness_goal}
- Diet Type: {profile.diet_type}
- Current Weight: {profile.current_weight} kg
- Height: {profile.height} cm
- BMI: {profile.bmi}
- Daily Calorie Goal: {profile.daily_cal_goal} kcal
- Protein Goal: {profile.protein_goal}g
"""

    system_prompt = f"""You are NutriAI, an expert Indian diet consultant and nutritionist.
You specialize in Indian cuisine, food culture, and traditional Indian dietary practices.
Always suggest Indian foods like dal, roti, sabzi, rice, paneer, dahi, etc.
Give practical, specific, and actionable advice.
Keep responses concise but helpful. Use bullet points when listing items.
{context}
Important: You are NOT a medical doctor. Always recommend consulting a doctor for medical conditions."""

    try:
        session_id = data.get('session_id', str(uuid.uuid4()))

        # Save user message
        if user:
            user_msg = ChatHistory(
                user_id    = user.id,
                session_id = session_id,
                role       = 'user',
                message    = message,
            )
            db.session.add(user_msg)

        # Groq API call
        response = groq_client.chat.completions.create(
            model    = 'llama-3.1-8b-instant',
            messages = [
                {'role': 'system', 'content': system_prompt},
                {'role': 'user',   'content': message}
            ],
            max_tokens  = 1024,
            temperature = 0.7,
        )

        reply  = response.choices[0].message.content
        tokens = response.usage.total_tokens if response.usage else 0

        # Save AI response
        if user:
            ai_msg = ChatHistory(
                user_id    = user.id,
                session_id = session_id,
                role       = 'ai',
                message    = reply,
                tokens     = tokens,
            )
            db.session.add(ai_msg)

            # Auto generate recommendation from chat
            if any(word in message.lower() for word in ['protein', 'weight', 'water', 'sleep', 'exercise']):
                rec = AIRecommendation(
                    user_id  = user.id,
                    rec_type = 'nutrition',
                    message  = reply[:200] + '...' if len(reply) > 200 else reply,
                )
                db.session.add(rec)

        db.session.commit()

        return jsonify({
            'reply':      reply,
            'session_id': session_id,
            'tokens':     tokens,
        })

    except Exception as e:
        return jsonify({'error': f'AI error: {str(e)}'}), 500


# ════════════════════════════════════════
#  STREAK
# ════════════════════════════════════════
@app.route('/api/streak', methods=['GET'])
def get_streak():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    streak = user.streak
    return jsonify(streak.to_dict() if streak else {
        'current_streak': 0,
        'longest_streak': 0,
        'total_days':     0,
        'goal_progress':  0,
    })


# ════════════════════════════════════════
#  NOTIFICATIONS
# ════════════════════════════════════════
@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    notifs = Notification.query.filter_by(
        user_id=user.id, is_deleted=False
    ).order_by(Notification.created_at.desc()).limit(20).all()

    return jsonify({'notifications': [n.to_dict() for n in notifs]})


@app.route('/api/notifications/<notif_id>/read', methods=['PUT'])
def mark_read(notif_id):
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    notif = Notification.query.filter_by(id=notif_id, user_id=user.id).first()
    if notif:
        notif.is_read = True
        db.session.commit()
    return jsonify({'message': 'Marked as read'})


# ════════════════════════════════════════
#  BMI CALCULATOR
# ════════════════════════════════════════
@app.route('/api/bmi', methods=['POST'])
def calculate_bmi():
    data   = request.get_json()
    weight = data.get('weight')
    height = data.get('height')

    if not weight or not height:
        return jsonify({'error': 'Weight and height required'}), 400

    bmi = calc_bmi(weight, height)

    if bmi < 18.5:   cat = 'Underweight'
    elif bmi < 25:   cat = 'Normal'
    elif bmi < 30:   cat = 'Overweight'
    else:            cat = 'Obese'

    # Log if user is authenticated
    user = get_current_user(request)
    if user:
        wlog = WeightLog(
            user_id  = user.id,
            weight   = weight,
            bmi      = bmi,
            log_date = date.today()
        )
        db.session.add(wlog)

        profile = user.health_profile
        if profile:
            profile.current_weight = weight
            profile.bmi = bmi

        db.session.commit()

    return jsonify({'bmi': bmi, 'category': cat})


# ════════════════════════════════════════
#  CHAT HISTORY
# ════════════════════════════════════════
@app.route('/api/chat/history', methods=['GET'])
def chat_history():
    user = get_current_user(request)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    chats = ChatHistory.query.filter_by(
        user_id=user.id, is_deleted=False
    ).order_by(ChatHistory.created_at.desc()).limit(50).all()

    return jsonify({'chats': [c.to_dict() for c in chats]})


# ════════════════════════════════════════
#  RUN
# ════════════════════════════════════════
if __name__ == '__main__':
    app.run(debug=True, port=5000)