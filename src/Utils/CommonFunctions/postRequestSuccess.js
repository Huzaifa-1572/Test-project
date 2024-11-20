import { clearIndexDb, getScreen } from "src/Utils/Helpers";
import { updateScreen } from "src/Redux/Reducers/ScreenState";

const postRequestSuccess = ({
  response,
  dispatch,
  navigate
}) => {
  const DATA = response?.data;
  if (!!DATA) {
    const NEXT_SCREEN = getScreen(DATA);
    dispatch(updateScreen(NEXT_SCREEN));
  } else {
    localStorage.clear();
    clearIndexDb();
    navigate("/");
  }
};

export default postRequestSuccess;
