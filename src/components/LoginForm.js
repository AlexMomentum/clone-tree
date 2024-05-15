// src/components/LoginForm.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { fetchUserSettings } from '../features/settingsSlice';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully!');
      dispatch(setUser({
        email: userCredential.user.email,
        uid: userCredential.user.uid
      }));
      dispatch(fetchUserSettings(userCredential.user.uid));
      navigate('/links');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={e => setEmail(e.target.value)} 
          value={email} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          value={password} 
          required 
        />
        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <p className="forgot-password-link">
          Forgot your password? <Link to="/reset-password">Reset it here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
