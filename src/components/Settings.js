import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings, updateSettings } from '../features/settingsSlice';

const Settings = () => {
  const { user, loading, error } = useSelector(state => ({
    user: state.user.data,
    loading: state.settings.loading,
    error: state.settings.error
  }));
  const dispatch = useDispatch();

  //const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
  //const [localButtonColor, setLocalButtonColor] = useState(buttonColor);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);


  // const handleSaveChanges = () => {
  //   dispatch(updateSettings({
  //     userId: user.uid,
  //     newSettings: {
  //       backgroundColor: localBackgroundColor,
  //       buttonColor: localButtonColor
  //     }
  //   }));
  // };

  return (
    <div className="settings-panel">
      <h1 className="text-xl font-bold">Settings</h1>
      {error && <p className="text-red-500">{error}</p>}
      {/* Additional settings fields can go here */}
    </div>
  );
};


export default Settings;
