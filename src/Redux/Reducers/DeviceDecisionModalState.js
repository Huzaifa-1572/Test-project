import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "",
    isDeviceDecisionModal: false,
};

export const DEVICE_DECISION_MODAL_STATE = createSlice({
    name: "DEVICE_DECISION_MODAL_STATE",
    initialState,
    reducers: {
        showDeviceDecisionModal: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.isDeviceDecisionModal = action.payload.isDeviceDecisionModal;
        },
        closeDeviceDecisionModal: (state) => {
            state.title = null;
            state.description = "";
            state.isDeviceDecisionModal = false;
        },
    },
});

export const { showDeviceDecisionModal, closeDeviceDecisionModal } = DEVICE_DECISION_MODAL_STATE.actions;

export default DEVICE_DECISION_MODAL_STATE.reducer;
