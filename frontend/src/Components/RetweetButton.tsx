import React from 'react';
import axios from 'axios';
import '../Styles/RetweetButton.css';

const RetweetButton: React.FC<{ tweetId: number, onRetweet: () => void }> = ({ tweetId, onRetweet }) => {
  const handleRetweet = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://127.0.0.1:5000/api/tweet/${tweetId}/retweet`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onRetweet();
    } catch (error) {
      console.error("Error retweeting:", error);
    }
  };

  return (
    <button className="retweet-button" onClick={handleRetweet}>Retweet</button>
  );
};

export default RetweetButton;
