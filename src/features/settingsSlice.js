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
    backgroundColor: '#ffffff',  // default background color
    buttonColor: '#0000ff',      // default button color
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setButtonColor: (state, action) => {
      state.buttonColor = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.backgroundColor = action.payload.backgroundColor || state.backgroundColor;
        state.buttonColor = action.payload.buttonColor || state.buttonColor;
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch settings';
        state.loading = false;
      });
  }
});


export const { setBackgroundColor, setButtonColor, setUserId } = settingsSlice.actions;

export default settingsSlice.reducer;