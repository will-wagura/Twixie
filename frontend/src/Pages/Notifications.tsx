// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Styles/Profile.css';
import Sidebar from '../Components/Sidebar';
// const Notifications: React.FC = () => {


//   return (
//     <div>
//       <Sidebar/>
      
//     </div>
  
//   );
// };

// export default Notifications;

import React, { useState} from 'react';
import {FaSearch } from 'react-icons/fa';
import "../Styles/Notifications.css";

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  return (

    <div className="container">
      <Sidebar/>
      {/* <aside className="sidebar">
        <div className="logo">X</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#notifications" className="active">Notifications</a></li>
            <li><a href="#messages">Messages</a></li>
            <li><a href="#grok">Grok</a></li>
            <li><a href="#communities">Communities</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#more">More</a></li>
          </ul>
        </nav>
        <button className="post-button">Post</button>
        <div className="user-profile">
          <div className="avatar">S</div>
          <div className="user-info">
            <span className="username">stephie kamau</span>
            <span className="handle">@KamauSteph3725</span>
          </div>
        </div>
      </aside> */}
      <main>
        
          
          <div className="settings-icon">
          <h1>Notifications</h1>
          </div>
          
        
        
        <nav className="sticky-nav-notifications">
      <div 
        className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => setActiveTab('all')}
      >
        All
      </div>
      <div 
        className={`nav-item ${activeTab === 'verified' ? 'active' : ''}`}
        onClick={() => setActiveTab('verified')}
      >
        Verified
      </div>
      <div 
        className={`nav-item ${activeTab === 'mentions' ? 'active' : ''}`}
        onClick={() => setActiveTab('mentions')}
      >
        Mentions
      </div>
    </nav>
        <div className="notifications">
          <div className="notification">
            <img src="profile-pic-url" alt="Fabrizio Romano" className="notification-avatar" />
            <div className="notification-content">
              <h3>Fabrizio Romano</h3>
              <p>🚨🇫🇷 Kylian Mbappé: "In football you're good or not good. I wasn't good".</p>
              <p>"My Euro was a failure".</p>
              <p>"I wanted to be European champion... I will now go on holiday, I will rest well, it will do me a lot of good, then I will get ready to start a new life. There's a lot to do".</p>
            </div>
          </div>
          <div className="notification system">
            <div className="notification-icon">X</div>
            <p>There was a login to your account @KamauSteph37259 from a new device on Jul 02, 2024. Review it now.</p>
          </div>
        </div>
      </main>
      <aside className="trends">
      <div className="sticky-search-notifications">
  <div className="search-container-notifications">
    <input 
      type="text" 
      className="search-input-notifications" 
      placeholder="Search" 
    />
    <button className="search-button-notifications">
      <FaSearch className="search-icon" />
    </button>
  </div>
</div>
        <div className="trends-container">
          <h2>Trends for you</h2>
          <div className="trend">
            <span className="trend-category">News · Trending</span>
            <h3>BREAKING NEWS</h3>
            <span className="trend-stats">146K posts</span>
          </div>
          {/* More trend items would go here */}
        </div>
      </aside>
    </div>
  );
};

export default Notifications;