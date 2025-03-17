import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Loader from "src/Common/Loader";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LivePhotoForMobile from "src/Components/CustomerOnboarding/LivePhotoCapture/LivePhotoForMobile";

const WrapperForHookFormProps = lazy(() => import("src/Layout/WrapperForHookFromProps"));


// Customer Onboarding Screens
const CustomerCnic = lazy(() => import("src/Components/CustomerOnboarding/CustomerCnic"));
const CustomerCnicResume = lazy(() => import("src/Components/CustomerOnboarding/CustomerCnicResume"));
const CustomerMobile = lazy(() => import("src/Components/CustomerOnboarding/CustomerMobile"));
const MobileVerification = lazy(() => import("src/Components/CustomerOnboarding/MobileVerfication"));
const HasValidEmail = lazy(() => import("src/Components/CustomerOnboarding/HasValidEmail"));
const CustomerEmail = lazy(() => import("src/Components/CustomerOnboarding/CustomerEmail"));
const EmailVerification = lazy(() => import("src/Components/CustomerOnboarding/EmailVerification"));
const AdditionalInformation = lazy(() => import("src/Components/CustomerOnboarding/AdditionalInformation"));
const DeviceLocation = lazy(() => import("src/Components/CustomerOnboarding/DeviceLocation"));
const AddressDetail = lazy(() => import("src/Components/CustomerOnboarding/AddressDetail"));
const LivePhotoCapture = lazy(() => import("src/Components/CustomerOnboarding/LivePhotoCapture/LivePhotoForWeb"));
const CnicFront = lazy(() => import("src/Components/CustomerOnboarding/CnicFront"));
const CnicBack = lazy(() => import("src/Components/CustomerOnboarding/CnicBack"));
const CnicDetail = lazy(() => import("src/Components/CustomerOnboarding/CnicDetail"));
const ReviewApplication = lazy(() => import("src/Components/CustomerOnboarding/ReviewApplication"));
const TermAndCondition = lazy(() => import("src/Components/CustomerOnboarding/TermAndCondition"));
const ApplicationComplete = lazy(() => import("src/Components/CustomerOnboarding/ApplicationComplete"));

export const showScreen = {
  // CUSTOMER ONBOARDING SCREENS
  // scr_deviceLocation: <DeviceLocation />,
  scr_deviceLocation: <LivePhotoForMobile />,
  // scr_deviceLocation: <TermAndCondition />,
  scr_customerCnic: <CustomerCnic />,
  scr_customerCnicResume: <CustomerCnicResume />,
  scr_customerMobile: <CustomerMobile />,
  scr_mobileVerification: <MobileVerification />,
  scr_hasValidEmail: <HasValidEmail />,
  scr_customerEmail: <CustomerEmail />,
  scr_emailVerification: <EmailVerification />,
  scr_livePhotoCapture: <LivePhotoForMobile />,
  scr_uploadCnicFront: <CnicFront />,
  scr_uploadCnicBack: <CnicBack />,
  scr_cnicDetail: <CnicDetail />,
  scr_additionalInformation: <AdditionalInformation />,
  scr_addressDetail: <AddressDetail />,
  scr_reviewApplication: <ReviewApplication />,
  scr_termsAndConditions: <TermAndCondition />,
  scr_applicationComplete: <ApplicationComplete />,
};

const CustomerOnboarding = () => {
  const CURRENT_SCREEN = useSelector(state => state?.currentScreenState)
  const { state } = useLocation();
  const IS_ALLOWED = state?.isAllowed || false

  // isAllowed make it sure user can'nt access route directly.
  if (!IS_ALLOWED) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <WrapperForHookFormProps>
        {showScreen[CURRENT_SCREEN]}
      </WrapperForHookFormProps>
    </Suspense>
  );
};

export default CustomerOnboarding;
