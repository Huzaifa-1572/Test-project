import { useEffect, useState } from "react";
import { getDataFromIndexDb } from "src/Utils/Helpers";

const useGetCurrentScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("");
  useEffect(() => {
    (async () => {
      const data = await getDataFromIndexDb();
      setCurrentScreen(data.currentScreen);
    })();
  }, []);

  return currentScreen;
};

export default useGetCurrentScreen;
