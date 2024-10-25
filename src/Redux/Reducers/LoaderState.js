import { createSlice } from '@reduxjs/toolkit';

const initialState = false

export const LOADER_STATE = createSlice({
  name: 'LOADER_STATE',
  initialState,
  reducers: {
    showLoader: () => {
      return true
    },
    closeLoader: () => {
      return false
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, closeLoader } = LOADER_STATE.actions;

export default LOADER_STATE.reducer;
