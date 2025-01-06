import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorModal from "src/Common/ErrorModal";
import { setupRequestInterceptor, setupResponseInterceptor } from "src/Utils/Helpers";
import { QUERY_CLIENT, THEME } from "src/Utils/Settings";
import Loader from "src/Common/Loader";
import './App.scss'

// LAZY LOADING
const LandingPage = lazy(() => import("src/Pages/LandingPage"));
const CustomerOnboarding = lazy(() => import("src/Pages/CustomerOnboarding"));

const App = () => {
  const isLoading = useSelector((state) => state.loaderState);
  const { errorCode, errorMessage, isError } = useSelector((state) => state?.errorState);

  useEffect(() => {
    setupRequestInterceptor();
    setupResponseInterceptor();

    // Get the current URL's query string
    const searchParams = new URLSearchParams(window.location.search);

    // Extract deviceId and playerId
    const deviceId = searchParams.get('deviceId') || '';
    const playerId = searchParams.get('playerId') || '';
    const makeModel = searchParams.get('makeModel') || '';
    const deviceType = searchParams.get('deviceType') || '';
    const deviceVersion = searchParams.get('deviceVersion') || '';
    const rooted = searchParams.get('rooted') || '';
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
