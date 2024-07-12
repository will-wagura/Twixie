import React from 'react';

interface TweetProps {
  id: number;
  content: string;
  timestamp: string;
  user_id: number;
  username: string;
  likes: number;
  retweets: number;
}

const Tweet: React.FC<TweetProps> = ({ content, timestamp, username, likes, retweets }) => {
  return (
    <div className="tweet bg-white p-4 rounded-3xl shadow-md">
      <div className="flex items-center space-x-4">
        <div className="tweet-username font-bold">{username}</div>
        <div className="tweet-timestamp text-gray-500">{new Date(timestamp).toLocaleString()}</div>
      </div>
      <div className="tweet-content my-2">{content}</div>
      <div className="tweet-interactions flex space-x-4 text-gray-500">
        <div>Likes: {likes}</div>
        <div>Retweets: {retweets}</div>
      </div>
    </div>
  );
};

export default Tweet;
