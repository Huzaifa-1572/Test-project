import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const PREV_SCREEN_STATE = createSlice({
  name: "PREV_SCREEN_STATE",
  initialState,
  reducers: {
    updatePrevScreen: (state, action) => {
      return action.payload;
    },
    ClearPrevScreen: () => {
      return "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePrevScreen, ClearPrevScreen } = PREV_SCREEN_STATE.actions;

export default PREV_SCREEN_STATE.reducer;
