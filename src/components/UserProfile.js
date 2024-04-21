import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div>
      {user ? <h1>Welcome, {user.name}</h1> : <p>No user data available.</p>}
    </div>
  );
};

export default UserProfile;