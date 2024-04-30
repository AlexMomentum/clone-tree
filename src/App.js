import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutButton from './components/LogoutButton';
import LinksManager from './components/LinksManager';
import Settings from './components/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings, setBackgroundColor, setButtonColor } from './features/settingsSlice'; // Import action creators

const App = () => {
  const user = useSelector(state => state.user.data);
  const backgroundColor = useSelector(state => state.settings.backgroundColor);
  const buttonColor = useSelector(state => state.settings.buttonColor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, navigate, dispatch]);
  
  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-background-color', backgroundColor);
    document.documentElement.style.setProperty('--dynamic-button-color', buttonColor);
}, [backgroundColor, buttonColor]);
   // Include backgroundColor in the dependency array

  // This function should correctly dispatch actions to update the Redux store for settings
  const updateStyles = (newStyles) => {
    if (newStyles.backgroundColor) {
      dispatch(setBackgroundColor(newStyles.backgroundColor));
    }
    if (newStyles.buttonColor) {
      dispatch(setButtonColor(newStyles.buttonColor));
    }
};

  const handleToggleSettings = () => {
    setShowSettings(prev => !prev);
  };
// style={{ backgroundColor }}
  // Inside your App component
  return (
    <div className="App min-h-screen flex flex-col" style={{ backgroundColor: backgroundColor }}> 
      {user && (
        <>
          <LogoutButton style={{ backgroundColor: buttonColor, color: 'white' }} />
          <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={handleToggleSettings}>
            Settings
          </button>
          {showSettings && <Settings onUpdateStyles={updateStyles} />}
        </>
      )}
      <Routes>
        <Route path="/" element={<Navigate replace to={user ? "/links" : "/login"} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/links" element={user ? <LinksManager userId={user.id} /> : <Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
