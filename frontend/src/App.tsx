import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Loading from "./components/Loading";
import Login from "./components/Login";

import Profile from "./pages/Profile";

import Home from "./pages/Home";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      
        
        <Route path="/profile" element={<Profile  />} />
       
      </Routes>
    </Router>
  );
};

export default App;
