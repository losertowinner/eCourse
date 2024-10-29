from flask_restx import fields, reqparse

from .extensions import api

model = api.model(
    "Model",
    {
        "id": fields.Integer(readonly=True, description="Unique ID"),
        "is_active": fields.Boolean(description="Active"),
        "date_created": fields.DateTime(dt_format="iso8601"),
    },
)

auth_fields = api.model(
    "Auth Model",
    {
        "email": fields.String,
        "password": fields.String,
    },
)

user_fields = api.clone(
    "User",
    model,
    auth_fields,
    {
        "username": fields.String,
        "first_name": fields.String,
        "last_name": fields.String,
    },
)

current_user_fields = api.clone(
    "Current User",
    user_fields,
    {
        "last_seen": fields.DateTime(dt_format="iso8601"),
    },
)


auth_parser = reqparse.RequestParser(bundle_errors=True)
auth_parser.add_argument(
    "email", required=True, type=str, help="Email cannot be blank!", location="form"
)
auth_parser.add_argument(
    "password",
    required=True,
    type=str,
    help="Password cannot be blank!",
    location="form",
)

user_parser = auth_parser.copy()
user_parser.add_argument(
    "username",
    required=True,
    type=str,
    help="Username cannot be blank!",
    location="form",
)
user_parser.add_argument(
    "first_name",
    required=True,
    type=str,
    help="First Name cannot be blank!",
    location="form",
)
user_parser.add_argument(
    "last_name",
    required=True,
    type=str,
    help="Last Name cannot be blank!",
    location="form",
)
user_parser.add_argument("phone", required=False, type=str, location="form")