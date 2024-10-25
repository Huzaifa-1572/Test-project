import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_VALUES } from "src/Utils/Constants";

const initialState = INITIAL_VALUES;

export const CUSTOMER_STATE = createSlice({
  name: "CUSTOMER_STATE",
  initialState,
  reducers: {
    setCnic: (state, action) => {
      state.customerCnic = action.payload;
    },
    setMobile: (state, action) => {
      state.customerEmail = action.payload;
    },
    setEmail: (state, action) => {
      state.customerEmail = action.payload;
    },
    setIsWelcome: (state, action) => {
      state.isWelcome = action.payload;
    },
    setIsResumeApplication: (state, action) => {
      state.isResumeApplication = action.payload;
    },
    setIsVerification: (state, action) => {
      state.isVerification = action.payload;
    },
    setIsMobileOtpVerification: (state, action) => {
      state.isMobileOtpVerification = action.payload;
    },
    setIsEmailOtpVerification: (state, action) => {
      state.isEmailOtpVerification = action.payload;
    },
    resetCustomerState: (state) => {
      state.customerCnic = "";
      state.customerEmail = "";
      state.customerMobile = "";
      state.customerOperator = "";
      state.isWelcome = false;
      state.isResumeApplication = false;
      state.isVerification = false;
      state.isMobileOtpVerification = false;
      state.isEmailOtpVerification = false;
    },
  },
});

export const {
  setCnic,
  setMobile,
  setEmail,
  setIsWelcome,
  setIsResumeApplication,
  setIsVerification,
  setIsMobileOtpVerification,
  setIsEmailOtpVerification,
  resetCustomerState,
} = CUSTOMER_STATE.actions;

export default CUSTOMER_STATE.reducer;
