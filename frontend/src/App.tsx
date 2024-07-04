import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Pages/Loading';
import Login from './Pages/Login';

const Explore: React.FC = () => <div>Explore Page</div>;
const Profile: React.FC = () => <div>Profile Page</div>;
const Signup: React.FC = () => <div>Signup Page</div>;
const Tweets: React.FC = () => <div>Tweets Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tweets" element={<Tweets />} />
      </Routes>
    </Router>
  );
};

export default App;
