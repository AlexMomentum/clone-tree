import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import settingsReducer from './features/settingsSlice';
import linksReducer from './features/linksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    links: linksReducer,
  },
  devTools: true, // Keep Redux DevTools enabled
});
