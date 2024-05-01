import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import { useNavigate, useLocation } from 'react-router-dom';
import whiteLinksIcon from '../assets/whitelinks.png';
import appearanceIcon from '../assets/appearanceIcon.png';
import settingsIcon from '../assets/settingsIcon.png';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState(location.pathname);

  const navigateTo = (path) => {
    navigate(path);
    setActiveSection(path);
  };

  const isActive = (path) => {
    return activeSection === path ? 'text-blue-700 font-bold' : 'text-white';
  };

  return (
    <div className="navbar bg-blue-500 p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex gap-4 mb-4 sm:mb-0">
        <button className={`px-4 py-2 rounded ${isActive('/links')}`} onClick={() => navigateTo('/links')}>
          <img src={whiteLinksIcon} alt="Links" className="w-6 h-6 inline-block mr-2" />
          <span className="hidden sm:inline">Links</span>
        </button>
        <button className={`px-4 py-2 rounded ${isActive('/appearance')}`} onClick={() => navigateTo('/appearance')}>
          <img src={appearanceIcon} alt="Appearance" className="w-6 h-6 inline-block mr-2" />
          <span className="hidden sm:inline">Appearance</span>
        </button>
        <button className={`px-4 py-2 rounded ${isActive('/settings')}`} onClick={() => navigateTo('/settings')}>
          <img src={settingsIcon} alt="Settings" className="w-6 h-6 inline-block mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavigationBar;
