import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QUERY_CLIENT, THEME } from "./Utils/Settings";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./Utils/Helpers";

// Lazy load components
const Loader = lazy(() => import("src/Common/Loader"));
const LandingLayout = lazy(() => import("src/Layout/LandingLayout"));
const LandingPage = lazy(() => import("src/Pages/LandingPage"));
const CustomerOnboarding = lazy(() => import("src/Pages/CustomerOnboarding"));
const CustomerOnboardingLayout = lazy(() => import("src/Layout/CustomerOnboardingLayout/index"));

const App = () => {
  const isLoading = useSelector((state) => state.loaderState);

  useEffect(() => {
    setupRequestInterceptor();
    setupResponseInterceptor();
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <ThemeProvider theme={THEME}>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <LandingLayout>
                      <LandingPage />
                    </LandingLayout>
                  }
                />
                <Route
                  path="/customer-onboarding"
                  element={
                    <CustomerOnboardingLayout>
                      <CustomerOnboarding />
                    </CustomerOnboardingLayout>
                  }
                />
                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>

        {/* Generic loader component */}
        {isLoading && <Loader />}
      </Suspense>
    </>
  );
};

export default App;
