from flask_restx import Resource, Namespace, abort
from flask_jwt_extended import (
    jwt_required,
    current_user,
    create_access_token,
    create_refresh_token,
)
from flask import jsonify
from datetime import datetime, timezone

from .dao import (
    load_categories,
    load_courses,
    load_course,
    check_user_duplicates,
    create_user,
    auth_user,
    load_users,
    load_lessons,
)
from .dto import (
    category_model,
    course_model,
    user_model,
    current_user_model,
    login_model,
    lesson_model,
)
from .parsers import course_parser, user_parser


category_ns = Namespace("categories", description="Categories operations")
course_ns = Namespace("courses", description="Courses operations")
lesson_ns = Namespace("lessons", description="Lessons operations")
user_ns = Namespace("users", description="Users operations")
token_ns = Namespace("token", description="Token operations")


@category_ns.route("/")
class CategoryResource(Resource):
    @category_ns.doc("list_categories")
    @category_ns.marshal_list_with(category_model)
    def get(self):
        """List all categories"""
        return load_categories()


@course_ns.route("/")
class CourseResource(Resource):
    @course_ns.doc("list_course")
    @course_ns.marshal_list_with(course_model, code=200, envelope="results")
    @course_ns.expect(course_parser)
    def get(self):
        """List all courses"""
        args = course_parser.parse_args()
        return load_courses(**args)


@course_ns.route("/<int:id>/")
@course_ns.param("id", "An ID")
@course_ns.response(404, "Not found")
class CourseResource(Resource):
    @course_ns.marshal_with(course_model, code=200)
    def get(self, id):
        """Get course"""
        return load_course(id=id) or abort(404, message="Not found")


@course_ns.route("/<int:id>/lessons/")
@course_ns.param("id", "An ID")
@course_ns.response(404, "Not found")
class CourseLessonsResource(Resource):
    @course_ns.marshal_with(lesson_model, code=200, envelope="results", as_list=True)
    def get(self, id):
        """Get all lessons by course"""
        return load_lessons(course=id) or abort(404, message="Not found")


@user_ns.route("/")
class UserResource(Resource):
    @user_ns.expect(user_parser)
    @user_ns.marshal_with(user_model, code=201)
    def post(self):
        """Create user account"""
        avatar_url = None
        args = user_parser.parse_args()
        avatar = args["avatar"]

        errors = check_user_duplicates(args["username"], args["email"])
        if errors:
            abort(400, message="Validation failed", errors=errors)

        if avatar:
            avatar_url = upload_image(file_data=avatar)

        new_user = create_user(
            username=args["username"],
            email=args["email"],
            password=args["password"],
            first_name=args["first_name"],
            last_name=args["last_name"],
            avatar=avatar_url,
            phone=args["phone"],
        )
        return new_user


@user_ns.route("/current-user/")
class CurrentUserResource(Resource):
    method_decorators = [jwt_required(optional=True)]

    @user_ns.doc(security="jwt")
    @user_ns.marshal_with(current_user_model, code=200)
    def get(self):
        """Get current user"""
        return load_users(id=current_user.id)


@token_ns.route("/")
class TokenResource(Resource):
    @token_ns.expect(login_model)
    def post(self):
        """Get access token"""
        user = auth_user(
            email=token_ns.payload["email"], password=token_ns.payload["password"]
        )
        if not user:
            return jsonify(message="Invalid email or password"), 401
        user.last_seen = datetime.now(timezone.utc)
        user.save()
        access_token = create_access_token(identity=user, fresh=True)
        refresh_token = create_refresh_token(identity=user)
        return jsonify(access_token=access_token, refresh_token=refresh_token)
