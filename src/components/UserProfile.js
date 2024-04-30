import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserSettings } from '../features/settingsSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  // Effect to load user-specific settings when the user data is available
  useEffect(() => {
    if (user && user.uid) {
      dispatch(fetchUserSettings(user.uid));
    }
  }, [user, dispatch]);

  return (
    <div>
      {user ? <h1>Welcome, {user.name}</h1> : <p>No user data available.</p>}
    </div>
  );
};

export default UserProfile;
