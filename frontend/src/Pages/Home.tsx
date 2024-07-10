import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaRegEnvelope, FaSearch } from 'react-icons/fa';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";


import '../Styles/Home.css';
import logo from '../assets/tl.png'; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('for-you');

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="sidebar-item" onClick={refreshPage}>
          <FaHome className="sidebar-icon" />
          <span className="sidebar-label">Home</span>
        </div>
        <Link to="/explore" className="sidebar-item">
          <IoIosSearch className="sidebar-icon" />
          <span className="sidebar-label">Explore</span>
        </Link>
        <Link to="/notifications" className="sidebar-item">
          <MdOutlineNotificationsActive className="sidebar-icon" />
          <span className="sidebar-label">Notifications</span>
        </Link>
        <Link to="/messages" className="sidebar-item">
          <FaRegEnvelope className="sidebar-icon" />
          <span className="sidebar-label">Messages</span>
        </Link>
        <Link to="/profile" className="sidebar-item">
          <CgProfile className="sidebar-icon" />
          <span className="sidebar-label">Profile</span>
        </Link>
      </div>
      <div className="main-content">
        <nav className="sticky-nav">
          <div 
            className={`nav-item ${activeTab === 'for-you' ? 'active' : ''}`}
            onClick={() => setActiveTab('for-you')}
          >
            For You
          </div>
          <div 
            className={`nav-item ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </div>
        </nav>
        <div className="content">
        <div className="content-section">

  <div className="profile-post">
  <Link to="/profile" >
          <CgProfile className="profile-icon" />
          
        </Link>
    <input
      type="text"
      placeholder="What is happening?"
      className="post-input"
    />
    <button className="post-button">Post</button>
  </div>
  {/* Content for section 1 */}
</div>
        <div className="content-section">
          <h2>Section 2</h2>
          {/* Content for section 2 */}
        </div>
        </div>
      </div>
      <div className="main-content2">
      <div className="sticky-search">
  <div className="search-container">
    <input 
      type="text" 
      className="search-input" 
      placeholder="Search" 
    />
    <button className="search-button">
      <FaSearch className="search-icon" />
    </button>
  </div>
</div>
  <div className="content2">
    <div className="content-section2">
      <h2>Section 3</h2>
      {/* Content for section 3 */}
    </div>
  </div>
</div>
    </div>
  );
}

export default Home;