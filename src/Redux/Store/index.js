import { configureStore } from "@reduxjs/toolkit";
import LoaderState from "src/Redux/Reducers/LoaderState";
import ErrorState from "src/Redux/Reducers/ErrorState";
import ScreenState from "src/Redux/Reducers/ScreenState";
import ScreenDataState from "src/Redux/Reducers/ScreenDataState";

export const store = configureStore({
  reducer: {
    loaderState: LoaderState,
    errorState: ErrorState,
    screenState: ScreenState,
    screenDataState: ScreenDataState
  },
});
