from flask import Flask

from .config import config_type
from .extensions import api, migrate, bcrypt, jwt
from .resources import user_ns, token_ns
from .dao import fetch_user


def create_app(config_name="dev"):
    app = Flask(__name__)
    app.config.from_object(config_type[config_name])

    from .models import db

    db.init_app(app=app)
    migrate.init_app(app=app, db=db)
    bcrypt.init_app(app=app)
    jwt.init_app(app=app)

    api.init_app(app=app)
    api.add_namespace(user_ns)
    api.add_namespace(token_ns)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return fetch_user(id=identity)

    return app