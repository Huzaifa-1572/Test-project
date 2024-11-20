import {
  clearIndexDb,
  getScreen,
} from "src/Utils/Helpers";
import { updateScreen } from "src/Redux/Reducers/ScreenState";

const postRequestSuccess = ({ response, dispatch, NAVIGATE_TO, setValue }) => {
  const DATA = response?.data;
  if (!!DATA) {
    const NEXT_SCREEN = getScreen(DATA);

    localStorage.setItem("screenData", JSON.stringify(DATA?.next_screen));
    localStorage.setItem("currentScreen", NEXT_SCREEN);

    !!setValue &&
      fields?.forEach((field) => {
        if (field?.userValue) {
          setValue(field?.kuid, field?.userValue);
        }
      });

    dispatch(updateScreen(NEXT_SCREEN));
  } else {
    localStorage.clear();
    clearIndexDb();
    NAVIGATE_TO("/");
  }
};

export default postRequestSuccess;
