from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS


authorizations = {
    "jwt": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "description": "Type in the *'Value'* input box below: **'Bearer &lt;JWT&gt;'**, where JWT is the token",
    }
}

api = Api(
    contact="zin.it.dev@gmail.com",
    contact_email="zin.it.dev@gmail.com",
    version="1.0",
    title="eCourse 🎓 - Swagger UI",
    description="Documents API for eCourse 🎓",
    license="Apache 2.0",
    terms_url="https://www.google.com/policies/terms/",
    authorizations=authorizations,
    validate=True,
    ordered=True,
)
db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
jwt = JWTManager()
cors = CORS(resources={r"/*": {"origins": "*"}})
