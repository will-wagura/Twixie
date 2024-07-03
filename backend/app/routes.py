from flask import request, jsonify, Blueprint
from app import db
from app.models import User, Tweet
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

routes = Blueprint('routes', __name__)

@routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify(message='Email already registered'), 409

    user = User(username=username, email=email, password_hash=password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.password_hash == password:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify(message='Invalid credentials'), 401

@routes.route('/api/tweets', methods=['GET'])
def get_tweets():
    tweets = Tweet.query.all()
    return jsonify([tweet.to_dict() for tweet in tweets])

@routes.route('/api/tweets', methods=['POST'])
@jwt_required()
def create_tweet():
    user_id = get_jwt_identity()
    data = request.get_json()
    content = data.get('content')
    tweet = Tweet(content=content, user_id=user_id)
    db.session.add(tweet)
    db.session.commit()
    return jsonify(tweet.to_dict()), 201

@routes.route('/api/tweets/<int:id>', methods=['PUT'])
@jwt_required()
def update_tweet(id):
    user_id = get_jwt_identity()
    data = request.get_json()
    tweet = Tweet.query.get(id)

    if tweet and tweet.user_id == user_id:
        tweet.content = data.get('content', tweet.content)
        db.session.commit()
        return jsonify(tweet.to_dict()), 200
    return jsonify(message='Unauthorized or tweet not found'), 403

@routes.route('/api/tweets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tweet(id):
    user_id = get_jwt_identity()
    tweet = Tweet.query.get(id)
    if tweet and tweet.user_id == user_id:
        db.session.delete(tweet)
        db.session.commit()
        return jsonify(message='Tweet deleted'), 200
    return jsonify(message='Unauthorized'), 403