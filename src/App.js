// src/App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { fetchUserSettings, settingsSetBackgroundColor, settingsSetButtonColor } from './features/settingsSlice';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';
import LinksManager from './components/LinksManager';
import Settings from './components/Settings';
import Appearance from './components/Appearance';
import FanLinks from './components/FanLinks';
import NavigationBar from './components/NavigationBar';

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
      {user && <NavigationBar username={settings.username} onToggleSettings={handleToggleSettings} />}
      <Routes>
        <Route path="/" element={<Navigate replace to={user ? '/links' : '/login'} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate replace to="/login" />} />
        <Route path="/links" element={user ? <LinksManager userId={user.uid} /> : <Navigate replace to="/login" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate replace to="/login" />} />
        <Route path="/appearance" element={user ? <Appearance onUpdateStyles={updateStyles} /> : <Navigate replace to="/login" />} />
        <Route path="/fan/:username" element={<FanLinks />} />
      </Routes>
    </div>
  );
};

export default App;
