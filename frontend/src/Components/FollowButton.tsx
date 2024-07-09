import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/FollowButton.css';

const FollowButton: React.FC<{ userId: number, isFollowing: boolean, onToggleFollow: () => void }> = ({ userId, isFollowing, onToggleFollow }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem('token');
    try {
      if (following) {
        await axios.post(`http://127.0.0.1:5000/api/unfollow/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`http://127.0.0.1:5000/api/follow/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setFollowing(!following);
      onToggleFollow();
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <button className="follow-button" onClick={handleFollowToggle}>
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
