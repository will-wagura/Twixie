from flask import request, jsonify, Blueprint
from app import db
from app.models import User, Tweet, Like, Retweet
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

routes = Blueprint('routes', __name__)

@routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User with this email already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid email or password"}), 401

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

@routes.route('/api/follow/<int:user_id>', methods=['POST'])
@jwt_required()
def follow_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    user_to_follow = User.query.get(user_id)
    if user_to_follow is None:
        return jsonify({"message": "User not found"}), 404
    current_user.follow(user_to_follow)
    db.session.commit()
    return jsonify({"message": f"You are now following {user_to_follow.username}"}), 200

@routes.route('/api/unfollow/<int:user_id>', methods=['POST'])
@jwt_required()
def unfollow_user(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    user_to_unfollow = User.query.get(user_id)
    if user_to_unfollow is None:
        return jsonify({"message": "User not found"}), 404
    current_user.unfollow(user_to_unfollow)
    db.session.commit()
    return jsonify({"message": f"You have unfollowed {user_to_unfollow.username}"}), 200

@routes.route('/api/like/<int:tweet_id>', methods=['POST'])
@jwt_required()
def like_tweet(tweet_id):
    current_user_id = get_jwt_identity()
    tweet = Tweet.query.get(tweet_id)
    if tweet is None:
        return jsonify({"message": "Tweet not found"}), 404
    like = Like(user_id=current_user_id, tweet_id=tweet_id)
    db.session.add(like)
    db.session.commit()
    return jsonify({"message": "Tweet liked"}), 200

@routes.route('/api/unlike/<int:tweet_id>', methods=['POST'])
@jwt_required()
def unlike_tweet(tweet_id):
    current_user_id = get_jwt_identity()
    like = Like.query.filter_by(user_id=current_user_id, tweet_id=tweet_id).first()
    if like is None:
        return jsonify({"message": "Like not found"}), 404
    db.session.delete(like)
    db.session.commit()
    return jsonify({"message": "Like removed"}), 200

@routes.route('/api/retweet/<int:tweet_id>', methods=['POST'])
@jwt_required()
def retweet_tweet(tweet_id):
    current_user_id = get_jwt_identity()
    tweet = Tweet.query.get(tweet_id)
    if tweet is None:
        return jsonify({"message": "Tweet not found"}), 404
    retweet = Retweet(user_id=current_user_id, tweet_id=tweet_id)
    db.session.add(retweet)
    db.session.commit()
    return jsonify({"message": "Tweet retweeted"}), 200

@routes.route('/api/unretweet/<int:tweet_id>', methods=['POST'])
@jwt_required()
def unretweet_tweet(tweet_id):
    current_user_id = get_jwt_identity()
    retweet = Retweet.query.filter_by(user_id=current_user_id, tweet_id=tweet_id).first()
    if retweet is None:
        return jsonify({"message": "Retweet not found"}), 404
    db.session.delete(retweet)
    db.session.commit()
    return jsonify({"message": "Retweet removed"}), 200

@routes.route('/api/followed_tweets', methods=['GET'])
@jwt_required()
def get_followed_tweets():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    tweets = current_user.followed_tweets()
    return jsonify([tweet.to_dict() for tweet in tweets]), 200