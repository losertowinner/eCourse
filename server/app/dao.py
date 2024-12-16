from sqlalchemy import func

from .models import db, Category, User, Course, Lesson


def load_categories():
    return Category.query.filter(Category.active.__eq__(True)).all()


def load_courses(category=None, keyword=None, **kwargs):
    queries = Course.query.filter(Course.active.__eq__(True))

    if category:
        queries = queries.filter(Course.category_id.__eq__(category))

    if keyword:
        queries = queries.filter(Course.title.contains(keyword))

    return queries.order_by(Course.title).all()


def load_course(id=None):
    return Course.query.get(int(id))


def load_lessons(course=None):
    queries = Lesson.query.filter(Lesson.active.__eq__(True))

    if course:
        queries = queries.filter(Lesson.course_id.__eq__(course))

    return queries.all()


def load_users(id=None):
    return User.query.filter(User.active.__eq__(True), User.id.__eq__(id)).first()


def auth_user(email, password):
    user = User.query.filter(User.email.__eq__(email)).first()
    return user if user and user.check_password(password=password) else None


def create_user(username, email, password, **kwargs):
    user = User(username=username, email=email, password=password, **kwargs)
    user.save()
    return user


def check_user_duplicates(username, email):
    errors = {}
    if User.query.filter(User.username.__eq__(username)).first():
        errors["username"] = "Username is already taken"

    if User.query.filter(User.email.__eq__(email)).first():
        errors["email"] = "Email is already registered"

    return errors
