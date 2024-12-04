import cloudinary
from secrets import token_hex
from os import path, environ
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

base_dir = path.abspath(path.dirname(__file__))
file_path = path.join(path.dirname(__file__), "static")


class Config(object):
    SECRET_KEY = token_hex()
    JWT_SECRET_KEY = token_hex()
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + path.join(base_dir, "database", "ecourse.db")
    # SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    FLASK_ADMIN_SWATCH = "lux"
    PAGE_SIZE = 10

    cloudinary.config(
        cloud_name=environ.get("CLOUD_NAME"),
        api_key=environ.get("API_KEY"),
        api_secret=environ.get("API_SECRET"),
    )
