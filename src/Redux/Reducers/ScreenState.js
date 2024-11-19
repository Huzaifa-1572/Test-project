import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const SCREEN_STATE = createSlice({
  name: "SCREEN_STATE",
  initialState,
  reducers: {
    updateScreen: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateScreen } = SCREEN_STATE.actions;

export default SCREEN_STATE.reducer;
