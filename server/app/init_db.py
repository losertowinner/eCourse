from .models import db, Course, Category, Tag, User

db.drop_all()
db.create_all()

category = Category(title="Web Development")

admin = User(username="admin", email="admin@gmail.com", password="123", is_admin=True)
admin.save()

course1 = Course(
    title="Frontend",
    description="Step by step guide to becoming a modern frontend developer in 2024",
    category=category,
)
course2 = Course(
    title="Backend",
    description="Step by step guide to becoming a modern backend developer in 2024",
    category=category,
)
course3 = Course(
    title="Full Stack",
    description="Step by step guide to becoming a modern full stack developer in 2024",
    category=category,
)

tag1 = Tag(label="frontend")
tag2 = Tag(label="backend")
tag3 = Tag(label="fullstack")

course1.tags.append(tag1)
course2.tags.append(tag2)
course3.tags.append(tag3)

db.session.add_all([category, category, category])
db.session.add_all([course1, course2, course3])
db.session.add_all([tag1, tag2, tag3])

db.session.commit()
