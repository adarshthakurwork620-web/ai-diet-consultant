from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    password   = db.Column(db.String(200), nullable=False)
    age        = db.Column(db.Integer)
    weight     = db.Column(db.Float)
    height     = db.Column(db.Float)
    diet_type  = db.Column(db.String(50))
    goal       = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    stats  = db.relationship('UserStats', backref='user', uselist=False, cascade='all, delete-orphan')
    meals  = db.relationship('Meal', backref='user', cascade='all, delete-orphan')
    waters = db.relationship('Water', backref='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id':        self.id,
            'name':      self.name,
            'email':     self.email,
            'age':       self.age,
            'weight':    self.weight,
            'height':    self.height,
            'diet_type': self.diet_type,
            'goal':      self.goal,
        }


class UserStats(db.Model):
    __tablename__ = 'user_stats'
    id          = db.Column(db.Integer, primary_key=True)
    user_id     = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    streak      = db.Column(db.Integer, default=0)
    longest_streak = db.Column(db.Integer, default=0)
    last_active = db.Column(db.Date, default=date.today)
    total_days  = db.Column(db.Integer, default=0)
    goal_progress = db.Column(db.Float, default=0.0)

    def to_dict(self):
        return {
            'streak':         self.streak,
            'longest_streak': self.longest_streak,
            'last_active':    str(self.last_active),
            'total_days':     self.total_days,
            'goal_progress':  self.goal_progress,
        }


class Meal(db.Model):
    __tablename__ = 'meals'
    id        = db.Column(db.Integer, primary_key=True)
    user_id   = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meal_type = db.Column(db.String(50))
    food_name = db.Column(db.String(200))
    calories  = db.Column(db.Integer, default=0)
    protein   = db.Column(db.Float, default=0)
    carbs     = db.Column(db.Float, default=0)
    fat       = db.Column(db.Float, default=0)
    tag       = db.Column(db.String(50))
    meal_date = db.Column(db.Date, default=date.today)
    meal_time = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':        self.id,
            'meal_type': self.meal_type,
            'food_name': self.food_name,
            'calories':  self.calories,
            'protein':   self.protein,
            'carbs':     self.carbs,
            'fat':       self.fat,
            'tag':       self.tag,
            'meal_date': str(self.meal_date),
            'meal_time': self.meal_time,
        }


class Water(db.Model):
    __tablename__ = 'water'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    glasses    = db.Column(db.Integer, default=0)
    water_date = db.Column(db.Date, default=date.today)

    def to_dict(self):
        return {
            'glasses':    self.glasses,
            'water_date': str(self.water_date),
        }