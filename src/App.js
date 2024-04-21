import React from 'react';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutButton from './components/LogoutButton';

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      <UserProfile />
      <LoginForm />
      <RegisterForm />
      <LogoutButton />
      {/* Any other components you want to include can be added here */}
    </div>
  );
};

export default App;