from secrets import token_hex
from os import path, environ
from dotenv import load_dotenv

load_dotenv()

base_dir = path.abspath(path.dirname(__file__))
db_name = environ.get("DB_NAME")


class Config:
    SECRET_KEY = environ.get("SECRET_KEY") or token_hex(32)
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY") or token_hex(64)


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(base_dir, "database", db_name)
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(
        base_dir, "database", "test_ecourse.db"
    )
    TESTING = True


config_type = dict(dev=DevConfig, testing=TestingConfig)