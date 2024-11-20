import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { setupRequestInterceptor, setupResponseInterceptor } from "./Utils/Helpers";
import { QUERY_CLIENT, THEME } from "./Utils/Settings";

// LAZY LOADING
const Loader = lazy(() => import("src/Common/Loader"));
const LandingPage = lazy(() => import("src/Pages/LandingPage"));
const CustomerOnboarding = lazy(() => import("src/Pages/CustomerOnboarding"));

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
                <Route path="/" element={<LandingPage />} />
                <Route path="/customer-onboarding" element={<CustomerOnboarding />} />
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
