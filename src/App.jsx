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
const DashboardLayout = lazy(() => import("src/Layout/DashboardLayout/index"));
const CustomerOnboardingLayout = lazy(() =>
  import("src/Layout/CustomerOnboardingLayout/index")
);

// Customer Onboarding Screens
const CnicVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/CnicVerification")
);
const MobileVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/MobileVerification")
);
const EmailVerification = lazy(() =>
  import("src/Pages/CustomerOnboarding/EmailVerification")
);
const PersonalInformation = lazy(() =>
  import("src/Pages/CustomerOnboarding/PersonalInformation")
);
const AddressDetail = lazy(() =>
  import("src/Pages/CustomerOnboarding/AddressDetail")
);
const CnicFront = lazy(() => import("src/Pages/CustomerOnboarding/CnicFront"));
const CnicBack = lazy(() => import("src/Pages/CustomerOnboarding/CnicBack"));
const CnicDetail = lazy(() =>
  import("src/Pages/CustomerOnboarding/CnicDetail")
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
                  <Route
                    path="personal-information"
                    element={<PersonalInformation />}
                  />
                  <Route
                    path="address-detail"
                    element={<AddressDetail />}
                  />
                  <Route path="upload-cnic-front" element={<CnicFront />} />
                  <Route path="upload-cnic-back" element={<CnicBack />} />
                  <Route path="cnic-detail" element={<CnicDetail />} />
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
