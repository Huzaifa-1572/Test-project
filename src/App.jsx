import React, { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { QUERY_CLIENT, THEME } from "./Utils/Settings";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

// Lazy load components
const Loader = lazy(() => import("src/Common/Loader"));
const ProtectedRoute = lazy(() => import("src/HOC/ProtectedRoute"));
const LandingLayout = lazy(() => import("src/Layout/LandingLayout"));
const LandingPage = lazy(() => import("src/Pages/LandingPage"));
const CustomerOnboardingLayout = lazy(() =>
  import("src/Layout/CustomerOnboardingLayout/index")
);
const UserInformation = lazy(() =>
  import("src/Pages/Dashboard/UserInformation")
);
const AgeConfirmation = lazy(() =>
  import("src/Pages/CustomerOnboarding/AgeConfirmation")
);
const AccountForYourself = lazy(() =>
  import("src/Pages/CustomerOnboarding/AccountForYourself")
);
const CnicVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/CnicVerification")
);
const MobileVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/MobileVerification")
);
const EmailVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/EmailVerification")
);

const App = () => {
  const isLoading = useSelector((state) => state.loaderState);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <ThemeProvider theme={THEME}>
            <Router>
              <Routes>
                {/* Public route */}
                <Route
                  path="/"
                  element={
                    <LandingLayout>
                      <LandingPage />
                    </LandingLayout>
                  }
                />

                {/* Customer Onboarding */}
                <Route
                  path="/customer-onboarding"
                  element={<CustomerOnboardingLayout />}
                >
                  <Route
                    path="age-confirmation"
                    element={<AgeConfirmation />}
                  />
                  <Route
                    path="account-for-self"
                    element={<AccountForYourself />}
                  />
                  <Route
                    path="cnic-verification"
                    element={<CnicVerification />}
                  />
                  <Route
                    path="mobile-verification"
                    element={<MobileVerification />}
                  />
                  <Route
                    path="email-verification"
                    element={<EmailVerification />}
                  />
                </Route>

                {/* Dashboard - Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard">
                    <Route
                      path="user-information"
                      element={<UserInformation />}
                    />
                  </Route>
                </Route>

                {/* Catch-all route for undefined paths */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
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
