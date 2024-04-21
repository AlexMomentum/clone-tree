import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
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
  },
});

export const { getUserStart, getUserSuccess, getUserFailure, clearUser } = userSlice.actions;

export default userSlice.reducer;
