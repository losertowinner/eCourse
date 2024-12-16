from flask_restx import fields

from .extensions import api

common_model = api.model(
    "Common",
    {
        "id": fields.Integer(readonly=True, description="Unique ID"),
        "active": fields.Boolean,
        "date_created": fields.DateTime(dt_format="iso8601"),
    },
)

base_model = api.inherit(
    "Base",
    common_model,
    {
        "tags": fields.List(fields.String, description="List of tags"),
    },
)

category_model = api.inherit(
    "Category",
    common_model,
    {
        "title": fields.String,
    },
)

course_model = api.inherit(
    "Course",
    base_model,
    {"title": fields.String, "description": fields.String, "category": fields.String},
)

resource_model = api.inherit(
    "Resource", common_model, {"url": fields.String, "title": fields.String}
)

lesson_model = api.inherit(
    "Lesson",
    base_model,
    {
        "title": fields.String,
        "content": fields.String,
        "course": fields.String,
        "resources": fields.List(
            fields.Nested(resource_model), description="List of resources"
        ),
    },
)

login_model = api.model(
    "Log In",
    {"email": fields.String(required=True), "password": fields.String(required=True)},
)

register_model = api.model(
    "Register",
    {
        "username": fields.String(required=True),
        "email": fields.String(required=True),
        "first_name": fields.String(required=True),
        "last_name": fields.String(required=True),
        "avatar": fields.String(required=False),
        "phone": fields.String(required=False),
    },
)

user_model = api.inherit(
    "User",
    register_model,
    {
        "password": fields.String(required=True),
    },
)

current_user_model = api.inherit(
    "Current User", register_model, {"last_seen": fields.String(required=False)}
)
