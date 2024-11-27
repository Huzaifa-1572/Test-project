import { UpdateScreenData } from "src/Redux/Reducers/ScreenDataState";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { clearIndexDb, getPrevScreen, getScreen } from "src/Utils/Helpers";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";

const postRequestSuccess = ({ response, dispatch, navigate, setValue }) => {
  const DATA = response?.data?.data;
  // --------------------FOR OTP VERFICATION SCREENS
  const OTP_VERIFICATION_TOKEN = response?.data?.data?.payload?.token;
  const VERIFICATION_SCREENS = [
    "scr_mobileVerification",
    "scr_emailVerification",
  ];
  // --------------------FOR OTP VERFICATION SCREENS

  if (!!DATA) {
    // FOR CURRENT SCREEN
    const NEXT_SCREEN = getScreen(DATA);
    dispatch(updateCurrentScreen(NEXT_SCREEN));
    
    // FOR PREVIOUS SCREEN
    const PREV_SCREEN = getPrevScreen(DATA);
    dispatch(updatePrevScreen(PREV_SCREEN));
    
    // FOR SCREEN DATA
    const NEXT_SCREEN_DATA = DATA?.nextScreenPayload || {};
    dispatch(UpdateScreenData(NEXT_SCREEN_DATA));

    // --------------------FOR RESUME SCREENS
    const FIELDS = DATA?.nextScreenPayload?.content_group[0]?.fields || [];
    FIELDS?.length &&
      FIELDS?.forEach((field) => {
        if (field?.userValue) {
          let processedValue = field?.userValue;

          if (field?.field_manifest === "checkbox") {
            processedValue = processedValue === "true";
          }

          setValue(field?.kuid, processedValue);
        }
      });
    // --------------------FOR RESUME SCREENS

    // --------------------FOR OTP VERFICATION SCREENS
    if (VERIFICATION_SCREENS?.includes(NEXT_SCREEN)) {
      setValue("OTP_VERIFICATION_TOKEN", OTP_VERIFICATION_TOKEN);
    }
    // --------------------FOR OTP VERFICATION SCREENS
  } else {
    localStorage.clear();
    clearIndexDb();
    navigate("/");
  }
};

export default postRequestSuccess;
