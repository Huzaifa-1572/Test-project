import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorCode: null,
  errorMessage: "",
  isError: false,
};

export const ERROR_STATE = createSlice({
  name: "ERROR_STATE",
  initialState,
  reducers: {
    showErrorModal: (state, action) => {
      state.errorCode = action.payload.errorCode;
      state.errorMessage = action.payload.errorMessage;
      state.isError = action.payload.isError;
    },
    closeErrorModal: (state) => {
      state.errorCode = null;
      state.errorMessage = "";
      state.isError = false;
    },
  },
});

export const { showErrorModal, closeErrorModal } = ERROR_STATE.actions;

export default ERROR_STATE.reducer;
