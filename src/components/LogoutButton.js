// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonColor = useSelector(state => state.settings.buttonColor);

  // Define style based on the buttonColor from Redux
  const style = {
    backgroundColor: buttonColor,
    color: 'white',
    padding: '8px 16px', // Example padding
    borderRadius: '5px', // Example border-radius
    cursor: 'pointer', // Hand cursor on hover
    border: 'none', // No border
    fontSize: '16px', // Example font size
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button style={style} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
