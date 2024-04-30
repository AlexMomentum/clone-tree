// src/components/RegisterForm.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the function from firebase/auth
import { auth } from '../firebase/firebase-config'; // Import the auth instance

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Call the function with the auth instance, email, and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} required />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
