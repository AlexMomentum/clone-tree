// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

// Check for unique username and update
export const setUsername = createAsyncThunk(
  'user/setUsername',
  async ({ userId, username }, { rejectWithValue }) => {
    try {
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('username', '==', username));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        return rejectWithValue('Username is already taken');
      }

      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { username }, { merge: true });
      return { username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register new user
export const register = createAsyncThunk(
  'user/register',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { email, username });

      // Create an empty links subcollection
      const linksCollection = collection(db, `users/${user.uid}/links`);
      await addDoc(linksCollection, { url: '', backgroundColor: '', order: 0 });

      return { user, email, username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Login existing user
// src/features/userSlice.js

// Login existing user
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve additional user data from Firestore
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log("Fetched user data:", docSnap.data()); // Debug log
        return { ...docSnap.data(), uid: user.uid };
      } else {
        console.log("User data not found, using default values."); // Debug log
        return { email, uid: user.uid, username: '' }; // Provide a default username if none exists
      }
    } catch (error) {
      console.error("Error during login:", error.message); // Debug log
      return rejectWithValue(error.message);
    }
  }
);


// Logout user
export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Settings
export const updateSettings = createAsyncThunk(
  'user/updateSettings',
  async ({ userId, newSettings }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, newSettings);
      return newSettings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null, // Initial state for user data
  isLoading: false,
  error: null,
  settings: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = {
        uid: action.payload.uid,
        email: action.payload.email,
        username: action.payload.username || '', // Ensure username is included
      };
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.data = null;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    userSetUsername: (state, action) => {
      if (state.data) {
        state.data.username = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.data = {
          uid: action.payload.uid,
          email: action.payload.email,
          username: action.payload.username,
        };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.data = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(setUsername.fulfilled, (state, action) => {
        if (state.data) {
          state.data.username = action.payload.username;
        }
      })
      .addCase(setUsername.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
