import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const CURRENT_SCREEN_STATE = createSlice({
  name: "SCREEN_STATE",
  initialState,
  reducers: {
    updateCurrentScreen: (state, action) => {
      return action.payload;
    },
    ClearCurrentScreen: () => {
      return ''
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentScreen, ClearCurrentScreen } = CURRENT_SCREEN_STATE.actions;

export default CURRENT_SCREEN_STATE.reducer;
