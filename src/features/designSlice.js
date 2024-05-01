// features/designSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const designSlice = createSlice({
  name: 'design',
  initialState: {
    backgroundColor: '#ffffff',
    buttonColor: '#0000ff',
  },
  reducers: {
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setButtonColor: (state, action) => {
      state.buttonColor = action.payload;
    },
  },
});

export const { setBackgroundColor, setButtonColor } = designSlice.actions;
export default designSlice.reducer;
