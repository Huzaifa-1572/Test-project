import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "src/Common/Loader";
import ErrorModal from "src/Common/Modals/ErrorModal";
import LivePhotoForMobile from "src/Components/CustomerOnboarding/LivePhotoCapture/LivePhotoForMobile";
import { preloadModels } from "src/Utils/Helpers";
import { QUERY_CLIENT, THEME } from "src/Utils/Settings";
import './App.scss';

console.log = function () { };

const App = () => {
  const isLoading = useSelector((state) => state.loaderState);
  const { errorCode, errorMessage, isError } = useSelector((state) => state?.errorState);
  const [livePhoto, setLivePhoto] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Get the current URL's query string
    const searchParams = new URLSearchParams(window.location.search);

    // Extract data coming from mobile app
    const deviceId = searchParams.get('deviceId') || 'temp';
    const playerId = searchParams.get('playerId') || 'temp';
    const makeModel = searchParams.get('makeModel') || 'temp';
    const deviceType = searchParams.get('deviceType') || 'temp';
    const deviceVersion = searchParams.get('deviceVersion') || 'temp';
    const rooted = searchParams.get('rooted') || false;
    sessionStorage.setItem('device', JSON.stringify({
      deviceId: deviceId,
      playerId: playerId,
      makeModel: makeModel,
      deviceType: deviceType,
      deviceVersion: deviceVersion,
      rooted: rooted,
    }))
    // PRE LOADING FACE DETECTION MODELS
    preloadModels()
  }, []);

  const setValue = (key, value) => {
    if (key === "KEY_LIVE_PHOTO") {
      setLivePhoto(value);
    }
  };

  const watch = (key) => {
    if (key === "KEY_LIVE_PHOTO") {
      return livePhoto;
    }
    return null;
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <ThemeProvider theme={THEME}>
            <LivePhotoForMobile 
              errors={errors} 
              setValue={setValue} 
              watch={watch} 
            />
            {/* GENERIC ERROR MODAL */}
            {!!isError && <ErrorModal errorCode={errorCode} errorMessage={errorMessage} isError={isError} />}
          </ThemeProvider>
        </QueryClientProvider>

        {/* GENERIC LOADER COMPONENT */}
        {isLoading && <Loader />}
      </Suspense>
    </>
  );
};

export default App;
