from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"]}})
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

    with app.app_context():
        from app.routes import routes
        app.register_blueprint(routes)

        db.create_all()

    return app
