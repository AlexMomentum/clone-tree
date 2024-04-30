import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Thunk for fetching user settings from Firestore
export const fetchUserSettings = createAsyncThunk(
  'settings/fetchUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().settings;
      } else {
        return rejectWithValue('No settings found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateColor = createAsyncThunk(
  'settings/updateColor',
  async (newColor, { dispatch, getState }) => {
    // You can use newColor and dispatch here
    // Example usage:
    const state = getState();
    const userId = state.user.data.uid;
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { backgroundColor: newColor, buttonColor: newColor }, { merge: true });
    dispatch(setBackgroundColor(newColor)); // Assuming you have this action
  }
);

// Thunk for persisting settings to Firestore
export const persistSettingsToFirestore = createAsyncThunk(
  'settings/persistSettingsToFirestore',
  async ({ userId, settings }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { settings }, { merge: true });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    backgroundColor: 'defaultColor', // Set this to your preferred default color
    buttonColor: '#4A90E2',
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // These should only update the local state, without any async calls
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setButtonColor: (state, action) => {
      state.buttonColor = action.payload;
    },
    // Add setUserId if needed for tracking which user is logged in
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        // Merge the previous logic here if there was another reducer for the same action
        state.backgroundColor = action.payload.backgroundColor || state.backgroundColor;
        state.buttonColor = action.payload.buttonColor || state.buttonColor;
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch settings';
        state.loading = false;
      });
      // Ensure no other cases for 'settings/fetchUserSettings/fulfilled' are defined
      // ... your other extraReducers
  }
});


export const { setBackgroundColor, setButtonColor, setUserId } = settingsSlice.actions;

export default settingsSlice.reducer;