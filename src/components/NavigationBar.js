import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import { useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import whiteLinksIcon from '../assets/whitelinks.png';
import appearanceIcon from '../assets/appearanceIcon.png';
import settingsIcon from '../assets/settingsIcon.png';

const NavigationBar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);

  const navItems = [
    { path: '/links', icon: whiteLinksIcon, label: 'Links' },
    { path: '/appearance', icon: appearanceIcon, label: 'Appearance' },
    { path: '/settings', icon: settingsIcon, label: 'Settings' }
  ];

  const backgroundColor = useSelector(state => state.settings.backgroundColor);
  return (
    <div className={`bg-${backgroundColor} p-4 flex flex-col sm:flex-row justify-between items-center`}
         style={{backgroundColor}}>
      <div className="flex gap-4 mb-4 sm:mb-0">
        {navItems.map(item => (
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
      <LogoutButton />
    </div>
  );
};

export default NavigationBar;
