// features/linksSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const linksSlice = createSlice({
  name: 'links',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addLink: (state, action) => {
      state.items.push(action.payload);
    },
    editLink: (state, action) => {
      const index = state.items.findIndex(link => link.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeLink: (state, action) => {
      state.items = state.items.filter(link => link.id !== action.payload);
    },
  },
});

export const { addLink, editLink, removeLink } = linksSlice.actions;
export default linksSlice.reducer;

