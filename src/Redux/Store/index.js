import { configureStore } from "@reduxjs/toolkit";
import { default as ErrorState, default as LoaderState } from "src/Redux/Reducers/LoaderState";
import ScreenState from "src/Redux/Reducers/ScreenState";

export const store = configureStore({
  reducer: {
    loaderState: LoaderState,
    errorState: ErrorState,
    screenState: ScreenState,
  },
});
