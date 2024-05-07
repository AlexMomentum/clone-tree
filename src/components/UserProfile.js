import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings, updateUserSettings } from '../features/settingsSlice';

const UserProfile = () => {
  const { user, settings } = useSelector(state => ({
    user: state.user.data,
    settings: state.settings
  }));
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  const handleSave = () => {
    if (user) {
      dispatch(updateUserSettings({ userId: user.uid, newSettings: { username } }));
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
