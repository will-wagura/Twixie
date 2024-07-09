import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LikeButton.css';

const LikeButton: React.FC<{ tweetId: number, isLiked: boolean, onToggleLike: () => void }> = ({ tweetId, isLiked, onToggleLike }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token');
    try {
      if (liked) {
        await axios.post(`http://127.0.0.1:5000/api/tweet/${tweetId}/unlike`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`http://127.0.0.1:5000/api/tweet/${tweetId}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setLiked(!liked);
      onToggleLike();
    } catch (error) {
      console.error("Error liking/unliking tweet:", error);
    }
  };

  return (
    <button className="like-button" onClick={handleLikeToggle}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
