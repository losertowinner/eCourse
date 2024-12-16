from flask_admin.contrib.sqla import ModelView
from flask_admin import expose, AdminIndexView, BaseView, Admin
from flask_admin.form import SecureForm
from flask import redirect, url_for
from flask_login import logout_user, current_user
from flask_admin.contrib.fileadmin import FileAdmin
from flask_admin.actions import action
from flask_babel import Babel

from .extensions import db
from .models import Category, User, Course, Lesson, Tag, Resource
from .config import Config, file_path
from .decorators import admin_required
from .widgets import CKTextAreaField
from .actions import change_active
from .utils import get_locale

cdn_ckeditor = ["//cdn.ckeditor.com/4.6.0/full-all/ckeditor.js"]


class AuthView(BaseView):
    # def is_accessible(self):
    #     return current_user.is_authenticated and current_user.is_admin
    pass


class AdminView(AdminIndexView):
    @expose("/")
    def index(self):
        return self.render("admin/index.html")


class AnalyticsView(AuthView):
    @expose("/")
    def index(self):
        return self.render(
            "admin/analytics.html",
            total=dict(
                courses=total_courses(),
                users=total_users(),
                comments=total_comments(),
                likes=total_likes(),
            ),
        )


class CommonView(ModelView, AuthView):
    form_base_class = SecureForm
    column_list = ["active", "date_created"]
    column_filters = ["active"]
    column_editable_list = ["active"]
    column_sortable_list = ["date_created"]
    create_modal = True
    edit_modal = True
    can_view_details = True
    can_export = True
    can_delete = True
    page_size = Config.PAGE_SIZE

    @action(
        "change_active",
        "Change Active",
        "Are you sure you want to change the active status of selected models?",
    )
    def action_active(self, ids):
        return change_active(self=self, ids=ids)


class CategoryView(CommonView):
    column_list = ["title", "courses"] + CommonView.column_list
    column_editable_list = ["title"] + CommonView.column_editable_list


class UserView(CommonView):
    column_labels = dict(is_admin="Admin")
    column_searchable_list = ["username", "email"]
    column_editable_list = [
        "is_admin",
    ] + CommonView.column_editable_list
    column_list = ["username", "email", "is_admin"] + CommonView.column_list
    column_filters = ["is_admin"] + CommonView.column_filters
    column_exclude_list = ["password"]


class CourseView(CommonView):
    extra_js = cdn_ckeditor

    form_overrides = {"description": CKTextAreaField}

    inline_models = [Lesson, Tag]
    column_list = ["title", "category"] + CommonView.column_list
    column_searchable_list = ["title"]
    column_editable_list = [
        "title",
        "category",
    ] + CommonView.column_editable_list
    column_sortable_list = ["title"] + CommonView.column_sortable_list


class LessonView(CommonView):
    inline_models = [Resource, Tag]
    column_list = ["title", "course"] + CommonView.column_list
    column_searchable_list = ["title"]
    column_editable_list = ["title", "course"] + CommonView.column_editable_list
    column_sortable_list = ["title"] + CommonView.column_sortable_list


class TagView(CommonView):
    column_list = ["label", "courses", "lessons"] + CommonView.column_list
    column_sortable_list = ["label"] + CommonView.column_sortable_list
    column_editable_list = ["label"] + CommonView.column_editable_list


class ResourceView(CommonView):
    column_list = ["url", "title", "lesson"] + CommonView.column_list
    column_searchable_list = ["title"]
    column_editable_list = ["title", "lesson"] + CommonView.column_editable_list
    column_sortable_list = ["title"] + CommonView.column_sortable_list


class LogoutView(AuthView):
    @admin_required
    @expose("/")
    def index(self):
        logout_user()
        return redirect(url_for("admin.index"))


class UploadFileView(FileAdmin, AuthView):
    pass


babel = Babel(locale_selector=get_locale)

admin_manager = Admin(
    name="eCourse 🎓", template_mode="bootstrap4", index_view=AdminView()
)

admin_manager.add_view(UserView(User, db.session, category="Management"))
admin_manager.add_view(CategoryView(Category, db.session, category="Management"))
admin_manager.add_view(CourseView(Course, db.session, category="Management"))
admin_manager.add_view(LessonView(Lesson, db.session, category="Management"))
admin_manager.add_view(ResourceView(Resource, db.session, category="Management"))
admin_manager.add_view(TagView(Tag, db.session, category="Management"))
admin_manager.add_view(
    AnalyticsView(name="Analytics & Statistics", endpoint="analytics-statistics")
)
admin_manager.add_view(
    UploadFileView(
        file_path, "/static/", name="Files", category="Settings", endpoint="files"
    )
)
admin_manager.add_view(
    LogoutView(name="Log Out", category="Settings", endpoint="logout")
)
