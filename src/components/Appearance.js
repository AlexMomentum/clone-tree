// src/components/Appearance.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  settingsSetBackgroundColor,
  settingsSetButtonColor,
  settingsSetUsername,
  updateUserSettings,
} from '../features/settingsSlice';

const Appearance = () => {
  const dispatch = useDispatch();
  const { user, backgroundColor, buttonColor, username, error } = useSelector((state) => ({
    user: state.user.data,
    backgroundColor: state.settings.backgroundColor,
    buttonColor: state.settings.buttonColor,
    username: state.settings.username,
    error: state.user.error,
  }));
  const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
  const [localButtonColor, setLocalButtonColor] = useState(buttonColor);
  const [localUsername, setLocalUsername] = useState(username);

  const handleSaveChanges = () => {
    // Update settings in the Redux store
    dispatch(settingsSetBackgroundColor(localBackgroundColor));
    dispatch(settingsSetButtonColor(localButtonColor));
    dispatch(settingsSetUsername(localUsername));

    // Update user settings in Firestore
    dispatch(updateUserSettings({
      userId: user.uid,
      newSettings: {
        backgroundColor: localBackgroundColor,
        buttonColor: localButtonColor,
        username: localUsername,
      },
    }));
  };

  return (
    <div className="appearance-page p-4">
      <h1 className="text-xl font-bold mb-4">Customize Appearance</h1>
      <div className="color-picker">
        <label>
          Background Color:
          <input
            type="color"
            value={localBackgroundColor}
            onChange={(e) => setLocalBackgroundColor(e.target.value)}
          />
        </label>
      </div>
      <div className="color-picker mt-4">
        <label>
          Button Color:
          <input
            type="color"
            value={localButtonColor}
            onChange={(e) => setLocalButtonColor(e.target.value)}
          />
        </label>
      </div>
      <div className="username-edit mt-4">
        <label>
          Username:
          <input
            type="text"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <button onClick={handleSaveChanges} style={{ marginTop: '20px' }}>
        Save Changes
      </button>
    </div>
  );
};

export default Appearance;
