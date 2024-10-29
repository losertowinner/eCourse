from .. import create_app
from ..extensions import db
from flask_testing import TestCase


class BaseTestCase(TestCase):
    def create_app(self):
        return create_app(config_name="testing")

    def setUp(self):
        self.app = self.create_app()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()