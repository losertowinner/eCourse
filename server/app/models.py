from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash

from .extensions import db
from .utils import hash_avatar_url


class Common(db.Model):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    active = Column(Boolean, default=True)
    date_created = Column(DateTime, default=datetime.utcnow)

    def save(self):
        db.session.add(self)
        db.session.commit()


class User(Common, UserMixin):
    username = Column(String(80), unique=True)
    email = Column(String(125), unique=True)
    password = Column(String(255))
    avatar = Column(String(225), default=None)
    first_name = Column(String(80), nullable=True)
    last_name = Column(String(80), nullable=True)
    phone = Column(String(10), nullable=True)
    last_login = Column(DateTime, default=datetime.now(timezone.utc))
    is_admin = Column(Boolean, default=False)

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.password = generate_password_hash(kwargs.get("password"), 10)
        if not self.avatar:
            self.avatar = hash_avatar_url(email=self.email)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __str__(self):
        return self.username


class Category(Common):
    title = Column(String(75), unique=True)

    courses = relationship("Course", backref="category", lazy=True)

    def __str__(self):
        return self.title


class Course(Common):
    title = Column(String(75), unique=True)
    description = Column(Text)

    category_id = Column(Integer, ForeignKey(Category.id))
    lessons = relationship("Lesson", backref="course", lazy=True)
    tags = relationship("Tag", secondary="course_tag", backref="courses", lazy=True)

    def __str__(self):
        return self.title


class Lesson(Common):
    title = Column(String(80))
    content = Column(Text)

    course_id = Column(Integer, ForeignKey(Course.id))
    tags = relationship("Tag", secondary="lesson_tag", backref="lessons")
    resources = relationship("Resource", backref="lesson", lazy=True)

    def __str__(self):
        return self.title


class Tag(Common):
    label = Column(String(80), unique=True)

    def __str__(self):
        return f"#{self.label}"


course_tag = db.Table(
    "course_tag",
    Column("course_id", Integer, ForeignKey(Course.id), nullable=False),
    Column("tag_id", Integer, ForeignKey(Tag.id), nullable=False),
)


lesson_tag = db.Table(
    "lesson_tag",
    Column("lesson_id", Integer, ForeignKey(Lesson.id), nullable=False),
    Column("tag_id", Integer, ForeignKey(Tag.id), nullable=False),
)


class Resource(Common):
    url = Column(String(125))
    title = Column(String(100), unique=True)

    lesson_id = Column(Integer, ForeignKey(Lesson.id))

    def __str__(self):
        return f"{self.title}-{self.url[:20]}"
