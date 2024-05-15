// src/components/Appearance.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings, updateUserSettings } from '../features/settingsSlice';

const Appearance = ({ onUpdateStyles }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const { backgroundColor, buttonColor } = useSelector((state) => state.settings);
  
  const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
  const [localButtonColor, setLocalButtonColor] = useState(buttonColor);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleSaveChanges = () => {
    const newSettings = { backgroundColor: localBackgroundColor, buttonColor: localButtonColor };
    dispatch(updateUserSettings({ userId: user.uid, newSettings }));
    onUpdateStyles(newSettings);
  };

  return (
    <div>
      <h2>Customize Appearance</h2>
      <label>
        Background Color:
        <input type="color" value={localBackgroundColor} onChange={(e) => setLocalBackgroundColor(e.target.value)} />
      </label>
      <label>
        Button Color:
        <input type="color" value={localButtonColor} onChange={(e) => setLocalButtonColor(e.target.value)} />
      </label>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default Appearance;


