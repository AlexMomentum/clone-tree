import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings } from '../features/settingsSlice';

const Settings = () => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Dispatch fetchUserSettings thunk to fetch and update Redux state
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  return (
    <div className="settings-panel">
      <h1 className="text-xl font-bold">Settings</h1>
      {/* Include other settings-related controls here as needed */}
    </div>
  );
};

export default Settings;
