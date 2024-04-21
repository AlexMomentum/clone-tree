// src/components/LogoutButton.js
import React from 'react';
import { auth } from '../firebase-config';


const LogoutButton = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('Logged out successfully!');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
