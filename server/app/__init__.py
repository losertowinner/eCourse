from flask import Flask

from .config import Config
from .extensions import db, api, cors, login_manager, bcrypt, jwt
from .resources import category_ns, course_ns, user_ns, token_ns, lesson_ns
from .admin import admin_manager, babel
from .dao import load_users


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    cors.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    api.init_app(app)
    api.add_namespace(category_ns)
    api.add_namespace(course_ns)
    api.add_namespace(user_ns)
    api.add_namespace(token_ns)
    api.add_namespace(lesson_ns)

    admin_manager.init_app(app)
    babel.init_app(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return load_users(id=identity)

    @login_manager.user_loader
    def load_user(user_id):
        return load_users(id=user_id)

    return app
