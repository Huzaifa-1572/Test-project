import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const ScreenDataState = createSlice({
    name: "ScreenDataState",
    initialState,
    reducers: {
        UpdateScreenData: (state, action) => {
            return { ...action.payload }
        },
        ClearScreenData: () => {
            return {}
        }
    },
});

export const { UpdateScreenData, ClearScreenData } = ScreenDataState.actions;

export default ScreenDataState.reducer;
