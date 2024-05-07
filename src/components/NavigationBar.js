// src/components/NavigationBar.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import LogoutButton from './LogoutButton';
import whiteLinksIcon from '../assets/whitelinks.png';
import appearanceIcon from '../assets/appearanceIcon.png';
import settingsIcon from '../assets/settingsIcon.png';
import { logout } from '../features/userSlice';

const NavigationBar = ({ username, onToggleSettings }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const backgroundColor = useSelector((state) => state.settings.backgroundColor);

  const navItems = [
    { path: '/links', icon: whiteLinksIcon, label: 'Links' },
    { path: '/appearance', icon: appearanceIcon, label: 'Appearance' },
    { path: '/settings', icon: settingsIcon, label: 'Settings' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleShare = async () => {
    console.log(`Sharing URL for username: ${username}`); // Debug log

    if (!username || typeof username !== 'string') {
      alert('Invalid username. Please set your username before sharing.');
      console.error('Invalid username:', username);
      return; // Stop execution if username is invalid
    }

    const url = `${window.location.origin}/fan/${username}`;
    console.log(`Generated share URL: ${url}`); // Debug log

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username}'s Fan Page`,
          text: `Check out ${username}'s fan page:`,
          url,
        });
      } catch (error) {
        console.error('Error sharing the fan page:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert(`Fan page link (${url}) copied to clipboard`);
    }
  };

  return (
    <div
      className={`bg-${backgroundColor} p-4 flex flex-col sm:flex-row justify-between items-center`}
      style={{ backgroundColor }}
    >
      <div className="flex gap-4 mb-4 sm:mb-0">
        {navItems.map((item) => (
          <NavButton
            key={item.path}
            to={item.path}
            isActive={activeSection === item.path}
            icon={item.icon}
            label={item.label}
            onClick={() => setActiveSection(item.path)}
          />
        ))}
      </div>
      <div className="nav-buttons flex gap-4">
        <button onClick={handleShare} className="share-button">
          Share
        </button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavigationBar;
