from datetime import datetime, timezone
from sqlalchemy import Column, Boolean, Integer, DateTime, String
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash

from .extensions import db


class BaseModel(db.Model):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    is_active = Column(Boolean, default=True)
    date_created = Column(DateTime, default=datetime.utcnow())

    def save(self):
        db.session.add(self)
        db.session.commit()


class User(BaseModel, UserMixin):
    username = Column(String(80), unique=True)
    email = Column(String(125), unique=True)
    password = Column(String(255))
    avatar = Column(String(225), default=None)
    first_name = Column(String(80), nullable=True)
    last_name = Column(String(80), nullable=True)
    phone = Column(String(10), nullable=True)
    last_seen = Column(DateTime, default=datetime.now(timezone.utc))

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.password = generate_password_hash(kwargs.get("password"), 10).decode(
            "utf-8"
        )

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __str__(self):
        return self.username