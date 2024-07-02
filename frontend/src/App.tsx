import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

// Placeholder components for each route
const Home: React.FC = () => <div>Home Page</div>;
const Explore: React.FC = () => <div>Explore Page</div>;
const Profile: React.FC = () => <div>Profile Page</div>;
const Login: React.FC = () => <div>Login Page</div>;
const Signup: React.FC = () => <div>Signup Page</div>;
const Tweets: React.FC = () => <div>Tweets Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/tweets" element={<Tweets />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;