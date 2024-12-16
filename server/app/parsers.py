from flask_restx import reqparse
from werkzeug.datastructures import FileStorage

course_parser = reqparse.RequestParser(bundle_errors=True)

course_parser.add_argument(
    "category", type=int, required=False, help="Category ID", location="args"
)
course_parser.add_argument(
    "keyword", type=str, required=False, help="Search keyword", location="args"
)

user_parser = reqparse.RequestParser(bundle_errors=True)
user_parser.add_argument("username", type=str, required=True, location="form")
user_parser.add_argument("email", type=str, required=True, location="form")
user_parser.add_argument("first_name", type=str, required=True, location="form")
user_parser.add_argument("last_name", type=str, required=True, location="form")
user_parser.add_argument("password", type=str, required=True, location="form")
user_parser.add_argument("phone", type=str, required=False, location="form")
user_parser.add_argument("avatar", type=FileStorage, required=False, location="files")
