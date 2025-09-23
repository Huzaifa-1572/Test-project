import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resetTimestamp: Date.now(),
};

export const RECAPTCHA_STATE = createSlice({
    name: "RECAPTCHA_STATE",
    initialState,
    reducers: {
        triggerRecaptchaReset: (state) => {
            state.resetTimestamp = Date.now();
        },
    },
});

export const { triggerRecaptchaReset } = RECAPTCHA_STATE.actions;

export default RECAPTCHA_STATE.reducer;