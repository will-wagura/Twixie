import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Components from './Components';
import logo from '../assets/tl.png';
import { loginUser, registerUser } from '../services/api';
import Footer from "./Footer";

function App() {
  const navigate = useNavigate();
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
      const response = await loginUser(loginData.email, loginData.password);
      const token = response.access_token;
      localStorage.setItem('token', token); 
      toast.success('Login successful!');
      navigate('/home'); 
    } catch (error) {
      toast.error('Login error: ' + (error as Error).message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(signupData.name, signupData.email, signupData.password);
      const token = response.token;
      localStorage.setItem('token', token);
      toast.success('Signup successful!');
      toggle(true);
      setSignupData({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error('Signup error: ' + (error as Error).message);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <img src={logo} alt="logo" style={{ width: "450px", height: "350px", marginRight: "250px" }} />
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
      <Footer />
    </div>
  );
}

export default App;
