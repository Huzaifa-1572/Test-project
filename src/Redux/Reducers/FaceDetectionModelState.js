import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const FaceDetectionModelState = createSlice({
    name: "FaceDetectionModelState",
    initialState,
    reducers: {
        updateModelState: (state, action) => {
            return action.payload;
        },
        ClearModelState: () => {
            return {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateModelState, ClearModelState } = FaceDetectionModelState.actions;

export default FaceDetectionModelState.reducer;
