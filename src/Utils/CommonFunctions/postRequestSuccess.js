import { UpdateScreenData } from "src/Redux/Reducers/ScreenDataState";
import { updateScreen } from "src/Redux/Reducers/ScreenState";
import { clearIndexDb, getScreen } from "src/Utils/Helpers";

const postRequestSuccess = ({ response, dispatch, navigate, setValue }) => {
  const DATA = response?.data?.data;
  // --------------------FOR OTP VERFICATION SCREENS
  const OTP_VERIFICATION_TOKEN = response?.data?.data?.payload?.token
  const VERIFICATION_SCREENS = ['scr_mobileVerification', 'scr_emailVerification']
  // --------------------FOR OTP VERFICATION SCREENS

  if (!!DATA) {
    const NEXT_SCREEN = getScreen(DATA);
    dispatch(updateScreen(NEXT_SCREEN));
    const NEXT_SCREEN_DATA = DATA?.nextScreenPayload || {}
    dispatch(UpdateScreenData(NEXT_SCREEN_DATA))

    // --------------------FOR OTP VERFICATION SCREENS
    if (VERIFICATION_SCREENS?.includes(NEXT_SCREEN)) {
      setValue('OTP_VERIFICATION_TOKEN', OTP_VERIFICATION_TOKEN)
    }
    // --------------------FOR OTP VERFICATION SCREENS

  }
  else {
    localStorage.clear();
    clearIndexDb();
    navigate("/");
  }
};

export default postRequestSuccess;
