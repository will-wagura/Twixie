import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Components/Loading';
import Login from './Components/Login';
// import Explore from './Components/Explore'; 
// import Profile from './Components/Profile'; 
// import Tweets from './Components/Tweets';
import Footer from './Components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/tweets" element={<Tweets />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


