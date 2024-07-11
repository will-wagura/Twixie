import os
import secrets
from dotenv import load_dotenv

load_dotenv()

# Generate a JWT Secret Key if it doesn't exist
if not os.getenv('JWT_SECRET_KEY'):
    jwt_secret_key = secrets.token_urlsafe(16)
    with open('.env', 'a') as f:
        f.write(f'JWT_SECRET_KEY={jwt_secret_key}\n')

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')