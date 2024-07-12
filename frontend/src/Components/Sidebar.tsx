// Sidebar.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaRegEnvelope } from 'react-icons/fa';
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
    <div className="sidebar-container">
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
      <div className="sidebar-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BiHomeCircle, BiUser } from 'react-icons/bi';
// import { BsBell, BsBookmark, BsTwitter, BsEnvelope } from 'react-icons/bs';
// import { HiOutlineHashtag } from 'react-icons/hi';

// const NAVIGATION_ITEMS = [
//   { title: 'Twitter', icon: BsTwitter },
//   { title: 'Home', icon: BiHomeCircle },
//   { title: 'Explore', icon: HiOutlineHashtag },
//   { title: 'Notifications', icon: BsBell },
//   { title: 'Messages', icon: BsEnvelope },
//   { title: 'Bookmarks', icon: BsBookmark },
//   { title: 'Profile', icon: BiUser },
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <section className="w-[23%] sticky top-0 xl:flex flex-col items-stretch h-screen hidden">
//       <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
//         {NAVIGATION_ITEMS.map((item) => (
//           <Link
//             className="hover:bg-white/10 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
//             to={`/${item.title.toLowerCase()}`}
//             key={item.title}
//           >
//             <div>
//               <item.icon />
//             </div>
//             {item.title !== 'Twitter' && <div>{item.title}</div>}
//           </Link>
//         ))}
//         <button className="rounded-full m-4 bg-twitterColor p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
//           Tweet
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Sidebar;