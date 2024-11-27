import { configureStore } from "@reduxjs/toolkit";
import LoaderState from "src/Redux/Reducers/LoaderState";
import ErrorState from "src/Redux/Reducers/ErrorState";
import CurrentScreenState from "src/Redux/Reducers/CurrentScreenState";
import PrevScreenState from "src/Redux/Reducers/PrevScreenState";
import ScreenDataState from "src/Redux/Reducers/ScreenDataState";

export const store = configureStore({
  reducer: {
    loaderState: LoaderState,
    errorState: ErrorState,
    currentScreenState: CurrentScreenState,
    prevScreenState: PrevScreenState,
    screenDataState: ScreenDataState
  },
});
