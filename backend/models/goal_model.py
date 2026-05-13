from datetime import datetime
from models.user_model import db

class Goal(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    goal_type = db.Column(db.String(80), default='Custom')
    target = db.Column(db.String(120), default='')
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('goals', lazy=True))
    statuses = db.relationship('DailyGoalStatus', backref='goal', lazy=True, cascade='all, delete-orphan')

    def to_dict(self, today_status=None):
        return {
            'id': self.id,
            'title': self.title,
            'goal_type': self.goal_type,
            'target': self.target,
            'active': self.active,
            'completed': bool(today_status.completed) if today_status else False,
            'completed_date': today_status.date.isoformat() if today_status else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class DailyGoalStatus(db.Model):
    __tablename__ = 'daily_goal_statuses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'goal_id', 'date', name='uix_user_goal_date'),
    )
