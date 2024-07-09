import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';

interface ProfileData {
  username: string;
  bio: string;
  followers_count: number;
  following_count: number;
}

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <p>{error ? error : 'Loading...'}</p>;
  }

  return (
    <div className="profile-container">
      <h2>{profile.username}</h2>
      <p className="bio">{profile.bio}</p>
      <div className="stats">
        <p key="followers">Followers: {profile.followers_count}</p>
        <p key="following">Following: {profile.following_count}</p>
      </div>
    </div>
  );
};

export default Profile;