import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';
import '../Styles/Profile.css';
import Sidebar from './Sidebar';

interface ProfileProps {
  userId: string;
}

interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  followers_count: number;
  following_count: number;
  joinDate: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!profile) {
    return <p>{error ? error : 'Loading...'}</p>;
  }

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="main-profile">
        <nav className="sticky-profile">
          <div className="nav-profile" onClick={handleBackClick}>
            <FaArrowLeft className="back-arrow" />
            {profile.displayName}
          </div>
          <div className="nav-profile">
            0 posts
          </div>
        </nav>
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-placeholder">{profile.displayName[0]}</span>
          </div>
          <button className="edit-profile-btn">Edit profile</button>
          <h2>{profile.displayName}</h2>
          <p className="username">@{profile.username}</p>
          <p className="join-date"><FaCalendarAlt /> Joined {profile.joinDate}</p>
          <div className="follow-stats">
            <span><strong>{profile.following_count}</strong> Following</span>
            <span><strong>{profile.followers_count}</strong> Followers</span>
          </div>
        </div>
        <div className="profile-tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Replies</button>
          <button className="tab">Highlights</button>
          <button className="tab">Media</button>
          <button className="tab">Likes</button>
        </div>
        <div className="profile-content">
          {/* You can add content for posts, replies, etc. here */}
        </div>
      </div>
      <div className="sidebar-right">
        <div className="who-to-follow">
          <h3>Who to follow</h3>
          {/* Add suggested users to follow here */}
        </div>
      </div>
    </div>
  );
}

export default Profile;