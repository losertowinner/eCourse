from datetime import datetime, timezone
from flask_restx import Resource, Namespace, marshal
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    current_user,
)

from .dto import user_fields, user_parser, auth_fields, current_user_fields
from .dao import create_user, check_account, auth_user, fetch_user

user_ns = Namespace("users", ordered=True, description="User operations")
token_ns = Namespace("oauth", ordered=True, description="Token operations")


@user_ns.route("/")
class UserResource(Resource):
    @user_ns.expect(user_parser, validate=True)
    def post(self):
        """Create user account"""
        args = user_parser.parse_args()

        if check_account(email=args["email"]):
            return {"message": "Email is invalid !!!"}, 400

        if check_account(username=args["username"]):
            return {"message": "Username is invalid !!!"}, 400

        new_user = create_user(
            username=args["username"],
            email=args["email"],
            password=args["password"],
            first_name=args["first_name"],
            last_name=args["last_name"],
            phone=args["phone"],
        )

        return marshal(new_user, user_fields), 201


@user_ns.route("/current-user/")
class CurrentUserResource(Resource):
    method_decorators = [jwt_required()]

    @user_ns.doc(security="jwt")
    @user_ns.marshal_with(current_user_fields, code=200)
    def get(self):
        """Get current user"""
        return fetch_user(current_user.id), 200


@token_ns.route("/token/")
class TokenResource(Resource):
    @token_ns.expect(auth_fields, validate=True)
    def post(self):
        """Get access token"""
        user = auth_user(
            email=token_ns.payload["email"], password=token_ns.payload["password"]
        )
        if not user:
            return {"message": "Invalid email or password"}, 401
        user.last_seen = datetime.now(timezone.utc)
        user.save()
        access_token = create_access_token(identity=user, fresh=True)
        refresh_token = create_refresh_token(identity=user)
        return {"access_token": access_token, "refresh_token": refresh_token}, 200