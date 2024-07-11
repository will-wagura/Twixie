import os
import sys
import pandas as pd
from faker import Faker
from datetime import datetime
from random import randint

# Add the backend directory to the system path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

from app import create_app, db
from app.models import User, Tweet, Reply, Like, Retweet

# Initialize the Flask app
app = create_app()
app.app_context().push()

fake = Faker()

def create_users_and_tweets_from_csv(csv_path):
    data = pd.read_csv(csv_path)
    emails = set()

    for _, row in data.iterrows():
        username = row['Username']
        content = row['Text']
        timestamp = datetime.strptime(row['Timestamp'], '%Y-%m-%d %H:%M:%S')
        
        # Create a new user if it doesn't exist
        user = User.query.filter_by(username=username).first()
        if not user:
            email = fake.email()
            while email in emails:
                email = fake.email()
            emails.add(email)

            user = User(
                username=username,
                email=email,
                bio=fake.sentence(),
                profile_picture=fake.image_url()
            )
            user.set_password(fake.password())
            db.session.add(user)
            db.session.commit()

        # Create a tweet
        tweet = Tweet(
            content=content,
            timestamp=timestamp,
            user_id=user.id
        )
        db.session.add(tweet)
        db.session.commit()

        # Add likes to the tweet
        for _ in range(randint(0, 10)):  # Random number of likes
            liker = User.query.order_by(db.func.random()).first()
            if liker:
                like = Like(user_id=liker.id, tweet_id=tweet.id)
                db.session.add(like)
        db.session.commit()

        # Add retweets to the tweet
        for _ in range(randint(0, 5)):  # Random number of retweets
            retweeter = User.query.order_by(db.func.random()).first()
            if retweeter:
                retweet = Retweet(user_id=retweeter.id, tweet_id=tweet.id)
                db.session.add(retweet)
        db.session.commit()

        # Create fake replies
        for _ in range(randint(1, 5)):
            reply_content = fake.sentence()
            reply_user = User.query.filter(User.id != user.id).order_by(db.func.random()).first()
            if reply_user:
                reply = Reply(
                    content=reply_content,
                    user_id=reply_user.id,
                    tweet_id=tweet.id,
                    timestamp=fake.date_time_between(start_date=timestamp)
                )
                db.session.add(reply)
        db.session.commit()

if __name__ == '__main__':
    csv_path = os.path.join(os.path.dirname(__file__), '../data/tweets.csv')
    create_users_and_tweets_from_csv(csv_path)