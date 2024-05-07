// src/features/settingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Fetch user settings
export const fetchUserSettings = createAsyncThunk(
  'settings/fetchUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const { settings = {} } = userData;
        return {
          ...settings,
          username: userData.username,
          backgroundColor: settings.backgroundColor || '#ffffff',
          buttonColor: settings.buttonColor || '#0000ff',
        };
      } else {
        return rejectWithValue('User not found');
      }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Update user settings
export const updateUserSettings = createAsyncThunk(
  'settings/updateUserSettings',
  async ({ userId, newSettings }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { settings: newSettings }, { merge: true });
      return newSettings;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    username: '',
    backgroundColor: '#ffffff',
    buttonColor: '#0000ff',
    loading: false,
    error: null,
  },
  reducers: {
    settingsSetUsername: (state, action) => {
      state.username = action.payload;
    },
    settingsSetBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    settingsSetButtonColor: (state, action) => {
      state.buttonColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        const { username, backgroundColor, buttonColor } = action.payload;
        state.username = username;
        state.backgroundColor = backgroundColor;
        state.buttonColor = buttonColor;
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch settings';
        state.loading = false;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        const { backgroundColor, buttonColor } = action.payload;
        state.backgroundColor = backgroundColor;
        state.buttonColor = buttonColor;
      });
  },
});

export const {
  settingsSetUsername,
  settingsSetBackgroundColor,
  settingsSetButtonColor,
} = settingsSlice.actions;
export default settingsSlice.reducer;
