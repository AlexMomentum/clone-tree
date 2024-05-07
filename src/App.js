// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NavigationBar from './components/NavigationBar';
import LinksManager from './components/LinksManager';
import Settings from './components/Settings';
import Appearance from './components/Appearance';
import FanLinks from './components/FanLinks';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserSettings,
  settingsSetBackgroundColor,
  settingsSetButtonColor,
} from './features/settingsSlice';

const App = () => {
  const { user, settings } = useSelector((state) => ({
    user: state.user.data,
    settings: state.settings,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-background-color', settings.backgroundColor);
    document.documentElement.style.setProperty('--dynamic-button-color', settings.buttonColor);
  }, [settings.backgroundColor, settings.buttonColor]);

  const updateStyles = (newStyles) => {
    if (newStyles.backgroundColor) {
      dispatch(settingsSetBackgroundColor(newStyles.backgroundColor));
    }
    if (newStyles.buttonColor) {
      dispatch(settingsSetButtonColor(newStyles.buttonColor));
    }
  };

  const handleToggleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {user && (
        <NavigationBar
          username={settings.username}
          onToggleSettings={handleToggleSettings}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate replace to={user ? '/links' : '/login'} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/links" element={user ? <LinksManager userId={user.uid} /> : <Navigate replace to='/login' />} />
        <Route path="/settings" element={<Settings onUpdateStyles={updateStyles} />} />
        <Route path="/appearance" element={<Appearance />} />
        <Route path="/fan/:username" element={<FanLinks />} />
      </Routes>
    </div>
  );
};

export default App;
