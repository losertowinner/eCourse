import random, cloudinary.uploader, hashlib
from flask import request, session


def generate_color_palette(amount):
    background_color, border_color = [], []

    for _ in range(amount):
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)

        rgba_color = f"rgba({r}, {g}, {b}, 0.5)"
        rgb_color = f"rgb({r}, {g}, {b})"

        background_color.append(rgba_color)
        border_color.append(rgb_color)

    return background_color, border_color


def upload_image(file_data):
    result = cloudinary.uploader.upload(file_data)
    return result.get("secure_url")


def hash_avatar_url(email=None, size=128, default="identicon", rating="g"):
    digest = hashlib.md5(email.lower().encode("utf-8")).hexdigest()
    return f"https://www.gravatar.com/avatar/{digest}?s={size}&d={default}&r={rating}"


def get_locale():
    if request.args.get("lang"):
        session["lang"] = request.args.get("lang")
    return session.get("lang", "en")
