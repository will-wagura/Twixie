import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Profile from "./Components/Profile";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import Notifications from "./Pages/Notifications";
import Messages from "./Pages/Messages";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Sidebar />} />
        
        <Route path="/profile" element={<Profile userId={0} />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/messages" element={<Messages/>} />
      </Routes>
    </Router>
  );
};

export default App;
