import { configureStore } from "@reduxjs/toolkit";
import LoaderState from "src/Redux/Reducers/LoaderState";
import ErrorState from "src/Redux/Reducers/LoaderState";
import CustomerState from "src/Redux/Reducers/CustomerState";
import ScreenState from "src/Redux/Reducers/ScreenState";

export const store = configureStore({
  reducer: {
    loaderState: LoaderState,
    errorState: ErrorState,
    customerState: CustomerState,
    screenState: ScreenState,
  },
});
