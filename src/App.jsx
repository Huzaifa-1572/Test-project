import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "src/Common/Loader";
import ErrorModal from "src/Common/Modals/ErrorModal";
import { preloadModels, setupRequestInterceptor, setupResponseInterceptor } from "src/Utils/Helpers";
import { QUERY_CLIENT, THEME } from "src/Utils/Settings";
import './App.scss';

// LAZY LOADING
const LandingPage = lazy(() => import("src/Pages/LandingPage"));
const CustomerOnboarding = lazy(() => import("src/Pages/CustomerOnboarding"));

console.log = function () { };


const App = () => {
  const isLoading = useSelector((state) => state.loaderState);
  const { errorCode, errorMessage, isError } = useSelector((state) => state?.errorState);

  useEffect(() => {
    setupRequestInterceptor();
    setupResponseInterceptor();

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

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <ThemeProvider theme={THEME}>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/customer-onboarding" element={<CustomerOnboarding />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {/* GENERIC ERROR MODAL */}
              {!!isError && <ErrorModal errorCode={errorCode} errorMessage={errorMessage} isError={isError} />}
            </Router>
          </ThemeProvider>
        </QueryClientProvider>

        {/* GENERIC LOADER COMPONENT */}
        {isLoading && <Loader />}
      </Suspense>
    </>
  );
};

export default App;
