// src/components/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { register } from '../features/userSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New Field
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const { user } = userCredential;
  //     await setDoc(doc(db, 'users', user.uid), {
  //       email,
  //       username, // Save Username
  //     });
  //     dispatch(setUser({ uid: user.uid, email, username }));
  //     navigate('/links');
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(register({ email, password }));
      if (register.fulfilled.match(resultAction)) {
        const { user } = resultAction.payload;
        dispatch(setUsername(username));
        navigate('/links');
      } else {
        setError(resultAction.payload);
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a unique username"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;