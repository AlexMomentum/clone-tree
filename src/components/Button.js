// src/components/Button.js
import React from 'react';
import { useSelector } from 'react-redux';

const Button = ({ children }) => {
  const buttonColor = useSelector((state) => state.settings.buttonColor);

  const buttonStyles = useSelector(state => ({
    backgroundColor: state.user.settings.buttonColor,
    color: 'white', // Or any other color that contrasts with the button color
  }
));

  return (
    <button style={buttonStyles}>
      {children}
    </button>
  );
};

export default Button;
