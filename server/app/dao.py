from .models import User


def create_user(username=None, email=None, password=None, **kwargs):
    user = User(username=username, email=email, password=password, **kwargs)
    user.save()
    return user


def check_account(email=None, username=None):
    queries = User.query.filter(User.is_active.__eq__(True))

    if email:
        queries = queries.filter(User.email.__eq__(email))

    if username:
        queries = queries.filter(User.username.__eq__(username))

    return queries.first()


def auth_user(email, password):
    user = User.query.filter(User.email.__eq__(email)).first()
    return user if user and user.check_password(password=password) else None


def fetch_user(id=None):
    return User.query.filter(User.is_active.__eq__(True), User.id.__eq__(id)).first()