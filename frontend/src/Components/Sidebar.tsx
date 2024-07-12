// Sidebar.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaRegEnvelope} from 'react-icons/fa';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

import '../Styles/Profile.css';
import logo from '../assets/tl.png'; 

const Sidebar: React.FC = () => {
//   const refreshPage = () => {
//     window.location.reload();
//   };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {/* <div className="sidebar-item" onClick={refreshPage}>
          <FaHome className="sidebar-icon" />
          <span className="sidebar-label">Home</span>
        </div> */}
         <Link to="/home" className="sidebar-item">
          <FaHome className="sidebar-icon" />
          <span className="sidebar-label">Home</span>
        </Link>
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
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;