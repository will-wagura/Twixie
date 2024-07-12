import random
from faker import Faker
from app import db
from models import User, Tweet, Like, Retweet, Reply

fake = Faker()


def create_fake_users(count=10):
    users = []
    for _ in range(count):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            profile_picture=fake.image_url(),
            bio=fake.text(max_nb_chars=200),
            location=fake.city(),
            created_at=fake.date_time_this_decade(),
        )
        user.set_password("password")  # Setting a default password for all users
        db.session.add(user)
        users.append(user)
    db.session.commit()
    return users


def create_fake_tweets(users, count=30):
    tweets = []
    for _ in range(count):
        tweet = Tweet(
            content=fake.text(max_nb_chars=280),
            timestamp=fake.date_time_this_year(),
            user_id=random.choice(users).id,
        )
        db.session.add(tweet)
        tweets.append(tweet)
    db.session.commit()
    return tweets


def create_fake_likes(users, tweets, count=50):
    for _ in range(count):
        like = Like(user_id=random.choice(users).id, tweet_id=random.choice(tweets).id)
        db.session.add(like)
    db.session.commit()


def create_fake_retweets(users, tweets, count=20):
    for _ in range(count):
        retweet = Retweet(
            user_id=random.choice(users).id, tweet_id=random.choice(tweets).id
        )
        db.session.add(retweet)
    db.session.commit()


def create_fake_replies(users, tweets, count=40):
    for _ in range(count):
        reply = Reply(
            content=fake.text(max_nb_chars=280),
            timestamp=fake.date_time_this_year(),
            user_id=random.choice(users).id,
            tweet_id=random.choice(tweets).id,
        )
        db.session.add(reply)
    db.session.commit()


def create_fake_followers(users, count=20):
    for _ in range(count):
        user1 = random.choice(users)
        user2 = random.choice(users)
        if user1 != user2:
            user1.follow(user2)
    db.session.commit()


def main():
    db.create_all()
    users = create_fake_users(10)
    tweets = create_fake_tweets(users, 30)
    create_fake_likes(users, tweets, 50)
    create_fake_retweets(users, tweets, 20)
    create_fake_replies(users, tweets, 40)
    create_fake_followers(users, 20)


if __name__ == "__main__":
    main()
