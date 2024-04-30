import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import settingsReducer from './features/settingsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
  },
  devTools: true, // Explicitly enabling Redux DevTools
});
