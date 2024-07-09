// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../Styles/Login.css";
// import Logo from "../assets/tl.png"; 
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// interface LoginData {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1500 });
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLoginData(prevData => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSignupNavigation = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="login-container" data-aos="slide-left">
//       <div className="left-section1">
//         <img
//           src={Logo}
//           alt="logo"
//           style={{ maxWidth: "450px", height: "350px" }}
//         />
//       </div>
//       <div className="right-section1" data-aos="fade-up">
//         <div className="form-container">
//           <h2>Log In</h2>
//           <form>
//             <div className="input-container">
//               <label htmlFor="username">Username or Email</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={loginData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="input-container">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={loginData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit">Log In</button>
//           </form>
//         </div>
//         <div className="contact_line">
//           <div className="line"></div>
//           <span className="section_subtitle">Or</span>
//           <div className="line2"></div>
//         </div>
//         <div className="acc-section">
//           <h4>Don't have an account? Join us today!</h4>
//           <button
//             className="option-button"
//             onClick={handleSignupNavigation}
//           >
//             Create an Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import * as Components from './Components';
import logo from '../assets/tl.png';

function App() {
  const [signIn, toggle] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', loginData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', signupData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="logo" style={{ width: "450px", height: "350px", marginRight: "250px"}} />
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignup}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input 
              type='text' 
              name="name"
              placeholder='Name' 
              value={signupData.name}
              onChange={handleSignupChange} 
            />
            <Components.Input 
              type='email' 
              name="email"
              placeholder='Email' 
              value={signupData.email}
              onChange={handleSignupChange} 
            />
            <Components.Input 
              type='password' 
              name="password"
              placeholder='Password' 
              value={signupData.password}
              onChange={handleSignupChange} 
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input 
              type='email' 
              name="email"
              placeholder='Email' 
              value={loginData.email}
              onChange={handleLoginChange} 
            />
            <Components.Input 
              type='password' 
              name="password"
              placeholder='Password' 
              value={loginData.password}
              onChange={handleLoginChange} 
            />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Already Have an Account?</Components.Title>
              <Components.Paragraph>
                Log in and continue from where you left off.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Dont Have an Account?</Components.Title>
              <Components.Paragraph>
                Join us today to create memories.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default App;




