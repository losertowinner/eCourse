from ...models import User
from ..conftest import BaseTestCase
from ...dao import create_user


class ModelsUnitTest(BaseTestCase):
    def test_check_password(self):
        u = User(username="ZIN", email="zin.it.dev@gmail.com", password="hello")
        self.assertFalse(u.check_password("dog"))
        self.assertTrue(u.check_password("hello"))

    def test_create_user(self):
        user = create_user(
            username="testuser", email="test@example.com", password="123"
        )
        self.assertIsNotNone(user)
        self.assertEqual(user.username, "testuser")