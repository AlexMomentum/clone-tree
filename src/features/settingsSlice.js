// src/features/settingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase-config';
import { doc, getDoc, setDoc, getState } from 'firebase/firestore';



export const fetchUserSettings = createAsyncThunk(
  'settings/fetchUserSettings',
  async (userId, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const settings = {
          backgroundColor: data.backgroundColor || '#ffffff', // Default color if not set
          buttonColor: data.buttonColor || '#0000ff' // Default color if not set
        };
        return settings;
      } else {
        console.error("No user document found for:", userId);
        return rejectWithValue('User not found');
      }
    } catch (error) {
      console.error("Fetch settings error:", error);
      return rejectWithValue(error.toString());
    }
  }
);




export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async ({ userId, newSettings }, { dispatch, getState, rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      // Fetch current settings
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        throw new Error('User not found');
      }

      const currentSettings = docSnap.data();
      const updatedSettings = {
        backgroundColor: newSettings.backgroundColor || currentSettings.backgroundColor,
        buttonColor: newSettings.buttonColor || currentSettings.buttonColor
      };

      // Update Firestore with merged settings
      await setDoc(userRef, updatedSettings, { merge: true });

      // Update local state
      dispatch(setBackgroundColor(updatedSettings.backgroundColor));
      dispatch(setButtonColor(updatedSettings.buttonColor));

      return updatedSettings;
    } catch (error) {
      console.error("Failed to update settings:", error);
      return rejectWithValue(error.toString());
    }
  }
);


const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    backgroundColor: '#ffffff',
    buttonColor: '#0000ff',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.backgroundColor = action.payload.backgroundColor;
        state.buttonColor = action.payload.buttonColor;
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch settings';
        state.loading = false;
      });
    }
  }); 

export const { setBackgroundColor, setButtonColor } = settingsSlice.actions;
export default settingsSlice.reducer;

