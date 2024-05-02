import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ to, isActive, icon, label }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`px-4 py-2 rounded ${isActive ? 'text-blue-700 font-bold' : 'text-white'}`}
      onClick={() => navigate(to)}
    >
      <img src={icon} alt={label} className="w-6 h-6 inline-block mr-2" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default NavButton;
