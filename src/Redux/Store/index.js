import { configureStore } from "@reduxjs/toolkit";
import CurrentScreenState from "src/Redux/Reducers/CurrentScreenState";
import DeviceDecisionModalState from "src/Redux/Reducers/DeviceDecisionModalState";
import ErrorState from "src/Redux/Reducers/ErrorState";
import LoaderState from "src/Redux/Reducers/LoaderState";
import PrevScreenState from "src/Redux/Reducers/PrevScreenState";
import RecaptchaState from "src/Redux/Reducers/RecaptchaState";
import ScreenDataState from "src/Redux/Reducers/ScreenDataState";

export const store = configureStore({
  reducer: {
    loaderState: LoaderState,
    errorState: ErrorState,
    currentScreenState: CurrentScreenState,
    prevScreenState: PrevScreenState,
    screenDataState: ScreenDataState,
    deviceDecisionModal: DeviceDecisionModalState,
    recaptchaState: RecaptchaState,
  },
});
