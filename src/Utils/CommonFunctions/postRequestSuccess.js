import { UpdateScreenData } from "src/Redux/Reducers/ScreenDataState";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { clearIndexDb, formatCNIC, getPrevScreen, getScreen } from "src/Utils/Helpers";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";
import { FIELD_MANIFEST, dateFormats } from "../Constants";
import dayjs from "dayjs";



const postRequestSuccess = ({ response, dispatch, navigate, setValue }) => {
  const DATA = response?.data?.data;
  const IS_DATA_AVAILABLE = Object.keys(DATA)?.length > 0;

  // --------------------FOR OTP VERFICATION SCREENS
  const OTP_VERIFICATION_TOKEN = response?.data?.data?.payload?.token;
  const VERIFICATION_SCREENS = ["scr_mobileVerification", "scr_emailVerification"];
  // --------------------FOR OTP VERFICATION SCREENS

  if (IS_DATA_AVAILABLE) {
    // ------------------FOR CURRENT SCREEN
    const NEXT_SCREEN = getScreen(DATA);
    if (NEXT_SCREEN !== "No Screen Found")
      dispatch(updateCurrentScreen(NEXT_SCREEN));

    // ------------------FOR PREVIOUS SCREEN
    const PREV_SCREEN = getPrevScreen(DATA);
    dispatch(updatePrevScreen(PREV_SCREEN));

    // ------------------FOR SCREEN DATA
    const NEXT_SCREEN_DATA = DATA?.nextScreenPayload || {};
    dispatch(UpdateScreenData(NEXT_SCREEN_DATA));

    // ------------------FOR RESUME SCREENS
    const FIELDS = DATA?.nextScreenPayload?.content_group[0]?.fields || [];
    FIELDS?.length &&
      FIELDS?.forEach((field) => {
        if (field?.userValue) {
          let processedValue = field?.userValue;

          if (field?.field_manifest === FIELD_MANIFEST.CHECKBOX) {
            processedValue = processedValue === "true";
          }

          if (field?.field_manifest === FIELD_MANIFEST.CNIC) {
            processedValue = formatCNIC(processedValue);
          }

          if (field?.field_manifest === FIELD_MANIFEST.DATE_PICKER) {
            const REPLACE_DOTS_WITH_SLASHES = processedValue?.replace(/\./g, "/");
            const parsedDate = dayjs(REPLACE_DOTS_WITH_SLASHES, "DD/MM/YYYY");
            processedValue = parsedDate?.isValid() ? parsedDate : null;
          }

          setValue(field?.kuid, processedValue);
        }
      });
    // ------------------FOR RESUME SCREENS

    // ------------------FOR OTP VERFICATION SCREENS
    if (VERIFICATION_SCREENS?.includes(NEXT_SCREEN)) {
      setValue("OTP_VERIFICATION_TOKEN", OTP_VERIFICATION_TOKEN);
    }
    // ------------------FOR OTP VERFICATION SCREENS
  } else {
    localStorage.clear();
    clearIndexDb();
    navigate("/");
  }
};

export default postRequestSuccess;
