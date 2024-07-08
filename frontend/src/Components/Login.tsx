import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import "../Styles/Login.css";
import Logo from "../assets/tl.png"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
// import axios from 'axios';

interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  // const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setData: React.Dispatch<React.SetStateAction<LoginData | SignupData>>) => {
    setData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-container" data-aos="slide-left">
      <div className="left-section1">
        <img
          src={Logo}
          alt="logo"
          style={{ maxWidth: "450px", height: "350px" }}
        />
      </div>
      <div className="right-section1" data-aos="fade-up">
        <div className="form-container">
          <h2>Log In</h2>
          {/* onSubmit={handleLogin} remember kuadd kwa form ukianza backend */}
          <form >
            <div className="input-container">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={(e) => handleChange(e, setLoginData)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, setLoginData)}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="contact_line">
          <div className="line"></div>
          <span className="section_subtitle">Or</span>
          <div className="line2"></div>
        </div>
        <div className="acc-section">
          <h4>Don't have an account? Join us today!</h4>
          <button
            className="option-button"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

