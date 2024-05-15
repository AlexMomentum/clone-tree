// src/components/Settings.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import { setUser } from '../features/userSlice';

const Settings = () => {
  const { user } = useSelector((state) => state.user.data);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(auth.currentUser);
        dispatch(setUser(null)); // Clear the user from the state
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;
