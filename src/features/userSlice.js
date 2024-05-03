import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log('setting user data:', action.payload);
      // Store only serializable data
      state.data = {
        uid: action.payload.uid,
        email: action.payload.email,
        // Any other user fields that are serializable
      };
      state.isLoading = false;
      state.error = null;
    },
    getUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.data = null;
    },
    // Add new reducer for updating settings
    updateSettings: (state, action) => {
      // This will merge existing settings with any updates provided
      state.settings = {...state.settings, ...action.payload};
    },
  },
});

// Export all actions, including the new updateSettings
export const { 
  setUser, getUserStart, getUserSuccess, getUserFailure, 
  clearUser, logout
} = userSlice.actions;

export default userSlice.reducer;
