import pandas as pd
from datetime import datetime
from faker import Faker
from app import create_app, db
from app.models import User, Tweet, Reply

app = create_app()
fake = Faker()

def create_users_and_tweets_from_csv(csv_path):
    data = pd.read_csv(csv_path)
    with app.app_context():
        users = {}

        # Create users and store them in a dictionary
        for index, row in data.iterrows():
            username = row['Username']

            # Check if the user exists, if not, create a new user
            if username not in users:
                user = User(
                    username=username,
                    email=f"{username}@example.com",
                    profile_picture=fake.image_url(),
                    bio=fake.text(max_nb_chars=200),
                    location=fake.city()
                )
                user.set_password('password')  # Set a default password
                db.session.add(user)
                db.session.commit()
                users[username] = user

            # Create a tweet
            user = users[username]
            tweet = Tweet(
                content=row['Text'],
                timestamp=datetime.strptime(row['Timestamp'], '%Y-%m-%d %H:%M:%S'),  # Adjust format if needed
                user_id=user.id
            )
            db.session.add(tweet)
            db.session.commit()
            print(f"Added tweet {index + 1} by {username}")

        # Create follower relationships
        usernames = list(users.keys())
        for user in users.values():
            num_following = fake.random_int(min=0, max=min(10, len(users)-1))  # Randomly choose the number of followings
            following = fake.random_choices(usernames, length=num_following, unique=True)
            for follow_username in following:
                if follow_username != user.username:
                    user_to_follow = users[follow_username]
                    user.follow(user_to_follow)
            db.session.commit()

        # Generate random replies for tweets
        tweets = Tweet.query.all()
        for tweet in tweets:
            num_replies = fake.random_int(min=0, max=5)  # Number of replies per tweet
            for _ in range(num_replies):
                replier = fake.random_element(users.values())
                reply = Reply(
                    content=fake.sentence(),
                    timestamp=fake.date_time_this_year(),
                    user_id=replier.id,
                    tweet_id=tweet.id
                )
                db.session.add(reply)
            db.session.commit()
            print(f"Added {num_replies} replies to tweet {tweet.id}")

if __name__ == "__main__":
    csv_path = '../data/tweets.csv'
    create_users_and_tweets_from_csv(csv_path)
