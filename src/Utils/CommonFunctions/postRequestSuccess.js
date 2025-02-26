import dayjs from "dayjs";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";
import { UpdateScreenData } from "src/Redux/Reducers/ScreenDataState";
import { clearIndexDb, formatCNIC, getPrevScreen, getScreen } from "src/Utils/Helpers";
import { FIELD_MANIFEST } from "../Constants";



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
    FIELDS?.forEach((field) => {
      if (!field?.userValue) return;

      let processedValue = field?.userValue;

      switch (field?.field_manifest) {
        case FIELD_MANIFEST.CHECKBOX:
          processedValue = field?.userValue === "true";
          break;

        case FIELD_MANIFEST.CNIC:
          processedValue = formatCNIC(field?.userValue);
          break;

        case FIELD_MANIFEST.DATE_PICKER: {
          const standardizedValue = field?.userValue?.replace(/[.-]/g, "/");
          const parsedDate = dayjs(standardizedValue, ["YYYY-MM-DD", "DD/MM/YYYY"], true);
          processedValue = parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
          break;
        }

        case FIELD_MANIFEST.TEXTDATE:
          processedValue = field?.userValue?.replace(/[.-]/g, "-");
          break;
      }

      setValue(field?.kuid, processedValue);
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
