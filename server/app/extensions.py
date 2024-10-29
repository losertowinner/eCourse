from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

authorizations = {
    "jwt": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Type in the *'Value'* input box below: **'Bearer &lt;JWT&gt;'**, where JWT is the token",
    }
}

api = Api(
    version="1.0.0",
    title="eCourse 🎓",
    description="APIs for eCourse 😶‍🌫️",
    contact="zin.it.dev@gmail.com",
    contact_email="zin.it.dev@gmail.com",
    license="Apache 2.0",
    terms_url="https://www.google.com/policies/terms/",
    security=["apikey", {"oauth2": ["read", "write"]}],
    authorizations=authorizations,
    validate=True,
    ordered=True,
)
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()