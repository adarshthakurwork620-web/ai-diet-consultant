from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
import uuid

db = SQLAlchemy()

def gen_uuid():
    return str(uuid.uuid4())

# ─────────────────────────────────────────
# 1. USERS TABLE
# ─────────────────────────────────────────
class User(db.Model):
    __tablename__ = 'users'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    name       = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password   = db.Column(db.String(200), nullable=False)
    phone      = db.Column(db.String(20))
    gender     = db.Column(db.String(10))
    dob        = db.Column(db.Date)
    country    = db.Column(db.String(50), default='India')
    city       = db.Column(db.String(50))
    timezone   = db.Column(db.String(50), default='Asia/Kolkata')
    language   = db.Column(db.String(20), default='en')
    is_active  = db.Column(db.Boolean, default=True)
    is_deleted = db.Column(db.Boolean, default=False)
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    health_profile  = db.relationship('HealthProfile',  backref='user', uselist=False, cascade='all, delete-orphan')
    medical_history = db.relationship('MedicalHistory', backref='user', uselist=False, cascade='all, delete-orphan')
    lifestyle       = db.relationship('Lifestyle',       backref='user', uselist=False, cascade='all, delete-orphan')
    streak          = db.relationship('Streak',          backref='user', uselist=False, cascade='all, delete-orphan')
    meals           = db.relationship('MealLog',         backref='user', cascade='all, delete-orphan')
    water_logs      = db.relationship('WaterLog',        backref='user', cascade='all, delete-orphan')
    weight_logs     = db.relationship('WeightLog',       backref='user', cascade='all, delete-orphan')
    diet_plans      = db.relationship('DietPlan',        backref='user', cascade='all, delete-orphan')
    chats           = db.relationship('ChatHistory',     backref='user', cascade='all, delete-orphan')
    notifications   = db.relationship('Notification',    backref='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id':        self.id,
            'name':      self.name,
            'email':     self.email,
            'phone':     self.phone,
            'gender':    self.gender,
            'country':   self.country,
            'city':      self.city,
            'is_active': self.is_active,
            'created_at': str(self.created_at),
        }


# ─────────────────────────────────────────
# 2. HEALTH PROFILE TABLE
# ─────────────────────────────────────────
class HealthProfile(db.Model):
    __tablename__ = 'health_profiles'

    id              = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id         = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    height          = db.Column(db.Float)
    current_weight  = db.Column(db.Float)
    target_weight   = db.Column(db.Float)
    bmi             = db.Column(db.Float)
    body_fat_pct    = db.Column(db.Float)
    waist_size      = db.Column(db.Float)
    activity_level  = db.Column(db.String(20))   # sedentary, light, moderate, active, very_active
    fitness_goal    = db.Column(db.String(50))   # weight_loss, muscle_gain, maintenance etc
    diet_type       = db.Column(db.String(50))   # vegetarian, vegan, keto etc
    daily_cal_goal  = db.Column(db.Integer, default=1800)
    protein_goal    = db.Column(db.Float, default=90)
    carb_goal       = db.Column(db.Float, default=250)
    fat_goal        = db.Column(db.Float, default=60)
    water_goal      = db.Column(db.Float, default=2.5)
    created_at      = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at      = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'height':         self.height,
            'current_weight': self.current_weight,
            'target_weight':  self.target_weight,
            'bmi':            self.bmi,
            'activity_level': self.activity_level,
            'fitness_goal':   self.fitness_goal,
            'diet_type':      self.diet_type,
            'daily_cal_goal': self.daily_cal_goal,
            'protein_goal':   self.protein_goal,
            'carb_goal':      self.carb_goal,
            'fat_goal':       self.fat_goal,
            'water_goal':     self.water_goal,
        }


# ─────────────────────────────────────────
# 3. MEDICAL HISTORY TABLE
# ─────────────────────────────────────────
class MedicalHistory(db.Model):
    __tablename__ = 'medical_histories'

    id                   = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id              = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    conditions           = db.Column(db.Text)      # JSON: ["diabetes", "hypertension"]
    allergies            = db.Column(db.Text)      # JSON: ["peanuts", "shellfish"]
    food_intolerances    = db.Column(db.Text)      # JSON: ["lactose", "gluten"]
    medications          = db.Column(db.Text)      # JSON: ["metformin"]
    dietary_restrictions = db.Column(db.Text)      # JSON: ["no_pork", "no_alcohol"]
    notes                = db.Column(db.Text)
    created_at           = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at           = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'conditions':           json.loads(self.conditions or '[]'),
            'allergies':            json.loads(self.allergies or '[]'),
            'food_intolerances':    json.loads(self.food_intolerances or '[]'),
            'dietary_restrictions': json.loads(self.dietary_restrictions or '[]'),
        }


# ─────────────────────────────────────────
# 4. LIFESTYLE TABLE
# ─────────────────────────────────────────
class Lifestyle(db.Model):
    __tablename__ = 'lifestyles'

    id                 = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id            = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    wake_time          = db.Column(db.String(10))   # "06:30"
    sleep_time         = db.Column(db.String(10))   # "22:30"
    stress_level       = db.Column(db.Integer)      # 1-10
    occupation         = db.Column(db.String(100))
    working_hours      = db.Column(db.Integer)
    smoking_status     = db.Column(db.Boolean, default=False)
    alcohol_status     = db.Column(db.Boolean, default=False)
    exercise_frequency = db.Column(db.String(20))   # daily, 3x/week, rarely
    preferred_cuisine  = db.Column(db.String(50))   # north_indian, south_indian, etc
    disliked_foods     = db.Column(db.Text)         # JSON array
    favorite_foods     = db.Column(db.Text)         # JSON array
    created_at         = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at         = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'wake_time':          self.wake_time,
            'sleep_time':         self.sleep_time,
            'stress_level':       self.stress_level,
            'exercise_frequency': self.exercise_frequency,
            'preferred_cuisine':  self.preferred_cuisine,
        }


# ─────────────────────────────────────────
# 5. STREAK TABLE
# ─────────────────────────────────────────
class Streak(db.Model):
    __tablename__ = 'streaks'

    id              = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id         = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    current_streak  = db.Column(db.Integer, default=0)
    longest_streak  = db.Column(db.Integer, default=0)
    last_active     = db.Column(db.Date, default=date.today)
    total_days      = db.Column(db.Integer, default=0)
    goal_progress   = db.Column(db.Float, default=0.0)
    created_at      = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at      = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'current_streak': self.current_streak,
            'longest_streak': self.longest_streak,
            'last_active':    str(self.last_active),
            'total_days':     self.total_days,
            'goal_progress':  self.goal_progress,
        }


# ─────────────────────────────────────────
# 6. FOOD DATABASE (Master Catalog)
# ─────────────────────────────────────────
class Food(db.Model):
    __tablename__ = 'foods'

    id           = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    name         = db.Column(db.String(200), nullable=False, index=True)
    name_hindi   = db.Column(db.String(200))
    category     = db.Column(db.String(50))     # fruits, vegetables, dairy, grains, meat, snacks
    calories     = db.Column(db.Float)
    protein      = db.Column(db.Float)
    carbs        = db.Column(db.Float)
    fat          = db.Column(db.Float)
    fiber        = db.Column(db.Float)
    sugar        = db.Column(db.Float)
    serving_size = db.Column(db.Float)
    serving_unit = db.Column(db.String(20))     # g, ml, cup, piece
    is_indian    = db.Column(db.Boolean, default=True)
    is_verified  = db.Column(db.Boolean, default=False)
    created_at   = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':           self.id,
            'name':         self.name,
            'category':     self.category,
            'calories':     self.calories,
            'protein':      self.protein,
            'carbs':        self.carbs,
            'fat':          self.fat,
            'serving_size': self.serving_size,
            'serving_unit': self.serving_unit,
        }


# ─────────────────────────────────────────
# 7. MEAL LOG TABLE
# ─────────────────────────────────────────
class MealLog(db.Model):
    __tablename__ = 'meal_logs'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    food_id    = db.Column(db.String(36), db.ForeignKey('foods.id'), nullable=True)
    meal_type  = db.Column(db.String(20))    # breakfast, lunch, dinner, snack
    food_name  = db.Column(db.String(200))   # custom food name if food_id is null
    quantity   = db.Column(db.Float, default=1)
    unit       = db.Column(db.String(20), default='serving')
    calories   = db.Column(db.Integer, default=0)
    protein    = db.Column(db.Float, default=0)
    carbs      = db.Column(db.Float, default=0)
    fat        = db.Column(db.Float, default=0)
    tag        = db.Column(db.String(30))    # healthy, moderate, treat
    meal_date  = db.Column(db.Date, default=date.today, index=True)
    meal_time  = db.Column(db.String(10))
    notes      = db.Column(db.Text)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':        self.id,
            'meal_type': self.meal_type,
            'food_name': self.food_name,
            'quantity':  self.quantity,
            'calories':  self.calories,
            'protein':   self.protein,
            'carbs':     self.carbs,
            'fat':       self.fat,
            'tag':       self.tag,
            'meal_date': str(self.meal_date),
            'meal_time': self.meal_time,
        }


# ─────────────────────────────────────────
# 8. WATER LOG TABLE
# ─────────────────────────────────────────
class WaterLog(db.Model):
    __tablename__ = 'water_logs'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    glasses    = db.Column(db.Integer, default=0)
    ml         = db.Column(db.Float, default=0)
    water_date = db.Column(db.Date, default=date.today, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'glasses':    self.glasses,
            'ml':         self.ml,
            'water_date': str(self.water_date),
        }


# ─────────────────────────────────────────
# 9. WEIGHT LOG TABLE
# ─────────────────────────────────────────
class WeightLog(db.Model):
    __tablename__ = 'weight_logs'

    id          = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id     = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    weight      = db.Column(db.Float, nullable=False)
    bmi         = db.Column(db.Float)
    body_fat    = db.Column(db.Float)
    waist       = db.Column(db.Float)
    log_date    = db.Column(db.Date, default=date.today, index=True)
    notes       = db.Column(db.Text)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':       self.id,
            'weight':   self.weight,
            'bmi':      self.bmi,
            'log_date': str(self.log_date),
        }


# ─────────────────────────────────────────
# 10. DIET PLAN TABLE
# ─────────────────────────────────────────
class DietPlan(db.Model):
    __tablename__ = 'diet_plans'

    id             = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id        = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    plan_name      = db.Column(db.String(100))
    goal           = db.Column(db.String(50))
    target_cal     = db.Column(db.Integer)
    protein_target = db.Column(db.Float)
    carb_target    = db.Column(db.Float)
    fat_target     = db.Column(db.Float)
    plan_data      = db.Column(db.Text)    # JSON: 7-day plan
    generated_by   = db.Column(db.String(20), default='ai')
    is_active      = db.Column(db.Boolean, default=True)
    start_date     = db.Column(db.Date, default=date.today)
    end_date       = db.Column(db.Date)
    created_at     = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'id':          self.id,
            'plan_name':   self.plan_name,
            'goal':        self.goal,
            'target_cal':  self.target_cal,
            'plan_data':   json.loads(self.plan_data or '{}'),
            'is_active':   self.is_active,
            'start_date':  str(self.start_date),
        }


# ─────────────────────────────────────────
# 11. AI CHAT HISTORY TABLE
# ─────────────────────────────────────────
class ChatHistory(db.Model):
    __tablename__ = 'chat_histories'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    session_id = db.Column(db.String(36), index=True)
    role       = db.Column(db.String(10))     # user, ai
    message    = db.Column(db.Text, nullable=False)
    tokens     = db.Column(db.Integer, default=0)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'id':         self.id,
            'session_id': self.session_id,
            'role':       self.role,
            'message':    self.message,
            'created_at': str(self.created_at),
        }


# ─────────────────────────────────────────
# 12. AI RECOMMENDATIONS TABLE
# ─────────────────────────────────────────
class AIRecommendation(db.Model):
    __tablename__ = 'ai_recommendations'

    id              = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id         = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    rec_type        = db.Column(db.String(30))    # nutrition, hydration, sleep, exercise
    message         = db.Column(db.Text)
    is_read         = db.Column(db.Boolean, default=False)
    user_feedback   = db.Column(db.String(10))    # helpful, not_helpful
    created_at      = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'id':        self.id,
            'rec_type':  self.rec_type,
            'message':   self.message,
            'is_read':   self.is_read,
            'created_at': str(self.created_at),
        }


# ─────────────────────────────────────────
# 13. EXERCISE LOG TABLE
# ─────────────────────────────────────────
class ExerciseLog(db.Model):
    __tablename__ = 'exercise_logs'

    id             = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id        = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    exercise_name  = db.Column(db.String(100))
    exercise_type  = db.Column(db.String(30))    # cardio, strength, yoga, sports
    duration_mins  = db.Column(db.Integer)
    calories_burned = db.Column(db.Integer)
    intensity      = db.Column(db.String(10))    # low, medium, high
    log_date       = db.Column(db.Date, default=date.today, index=True)
    notes          = db.Column(db.Text)
    created_at     = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':              self.id,
            'exercise_name':   self.exercise_name,
            'exercise_type':   self.exercise_type,
            'duration_mins':   self.duration_mins,
            'calories_burned': self.calories_burned,
            'log_date':        str(self.log_date),
        }


# ─────────────────────────────────────────
# 14. NOTIFICATION TABLE
# ─────────────────────────────────────────
class Notification(db.Model):
    __tablename__ = 'notifications'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    noti_type  = db.Column(db.String(20))    # water, meal, workout, streak
    title      = db.Column(db.String(100))
    message    = db.Column(db.Text)
    is_read    = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'id':        self.id,
            'noti_type': self.noti_type,
            'title':     self.title,
            'message':   self.message,
            'is_read':   self.is_read,
            'created_at': str(self.created_at),
        }


# ─────────────────────────────────────────
# 15. AUDIT LOG TABLE
# ─────────────────────────────────────────
class AuditLog(db.Model):
    __tablename__ = 'audit_logs'

    id         = db.Column(db.String(36), primary_key=True, default=gen_uuid)
    user_id    = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=True, index=True)
    action     = db.Column(db.String(50))      # login, logout, update_profile, log_meal
    table_name = db.Column(db.String(50))
    record_id  = db.Column(db.String(36))
    old_value  = db.Column(db.Text)            # JSON
    new_value  = db.Column(db.Text)            # JSON
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

    def to_dict(self):
        return {
            'action':     self.action,
            'table_name': self.table_name,
            'created_at': str(self.created_at),
        }