import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import '../Styles/Profile.css';
import Sidebar from './Sidebar';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="main-profile">
        <nav className="sticky-profile1">
          <div className="nav-profile" onClick={handleBackClick}>
            <FaArrowLeft className="back-arrow" />
            Profile
          </div>
          <div className="nav-profile">
            0 posts
          </div>
        </nav>
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-placeholder">S</span>
          </div>
          <button className="edit-profile-btn">Edit profile</button>
          <h2>stephie kamau</h2>
          <p className="username">@KamauSteph37259</p>
          <p className="join-date"><FaCalendarAlt /> Joined September 2023</p>
          <div className="follow-stats">
            <span><strong>0</strong> Following</span>
            <span><strong>0</strong> Followers</span>
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