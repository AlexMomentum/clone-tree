// src/components/LoginForm.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice'; // Ensure this is correctly imported

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation
  const dispatch = useDispatch();  // Redux dispatch

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully!');
      // Dispatch the setUser action with the user data
      dispatch(setUser({
        email: userCredential.user.email,
        uid: userCredential.user.uid
        // Add other user details you might need in your state
      }));
      navigate('/links');  // Navigate to '/links' on successful login
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} required />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
