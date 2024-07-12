import React, { useEffect, useState } from 'react';
import { getTweets } from '../services/api'; // Adjust the import path as necessary
import Tweet from './Tweet';

interface TweetData {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
  username: string;
  likes: number;
  retweets: number;
}

const Feed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await getTweets();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div className="flex-1 flex flex-col items-stretch space-y-4 mt-4">
      <div className="bg-white p-4 rounded-3xl shadow-md">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-2xl"
          placeholder="What is happening?!"
        />
        <button className="mt-4 rounded-full bg-twitterColor p-4 text-center hover:bg-opacity-70 transition duration-200">
          Post
        </button>
      </div>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          content={tweet.content}
          timestamp={tweet.timestamp}
          user_id={tweet.user_id}
          username={tweet.username}
          likes={tweet.likes}
          retweets={tweet.retweets}
        />
      ))}
    </div>
  );
};

export default Feed;
