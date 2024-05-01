import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NavigationBar from './components/NavigationBar';
import LinksManager from './components/LinksManager';
import Settings from './components/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings, setBackgroundColor, setButtonColor } from './features/settingsSlice';
import Appearance from './components/Appearance'

const App = () => {
  const { user, settings } = useSelector(state => ({
    user: state.user.data,
    settings: state.settings
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user settings
  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  // Update CSS variables whenever settings change
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-background-color', settings.backgroundColor);
    document.documentElement.style.setProperty('--dynamic-button-color', settings.buttonColor);
  }, [settings.backgroundColor, settings.buttonColor]);

  const updateStyles = (newStyles) => {
    if (newStyles.backgroundColor) {
      dispatch(setBackgroundColor(newStyles.backgroundColor));
    }
    if (newStyles.buttonColor) {
      dispatch(setButtonColor(newStyles.buttonColor));
    }
  };

  const handleToggleSettings = () => {
    navigate('/settings'); // Navigate to the settings route
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {user && <NavigationBar onToggleSettings={handleToggleSettings} />}
      <Routes>
        <Route path="/" element={<Navigate replace to={user ? "/links" : "/login"} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/links" element={user ? <LinksManager userId={user.id} /> : <Navigate replace to="/login" />} />
        <Route path="/settings" element={<Settings onUpdateStyles={updateStyles} />} />
        <Route path="/appearance" element={<Appearance />} />
      </Routes>
    </div>
  );
};

export default App;
