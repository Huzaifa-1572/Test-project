import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Loader from "src/Common/Loader";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import UpdateCnic from "src/Components/CustomerOnboarding/UpdateCnic";


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
const LivePhotoForWeb = lazy(() => import("src/Components/CustomerOnboarding/LivePhotoCapture/LivePhotoForWeb"));
const LivePhotoForMobile = lazy(() => import("src/Components/CustomerOnboarding/LivePhotoCapture/LivePhotoForMobile"));
const CnicFrontForWeb = lazy(() => import("src/Components/CustomerOnboarding/CnicFront/CnicFrontForWeb"));
const CnicFrontForMobile = lazy(() => import("src/Components/CustomerOnboarding/CnicFront/CnicFrontForMobile"));
const CnicBackForWeb = lazy(() => import("src/Components/CustomerOnboarding/CnicBack/CnicBackForWeb"));
const CnicBackForMobile = lazy(() => import("src/Components/CustomerOnboarding/CnicBack/CnicBackForMobile"));
const CnicDetail = lazy(() => import("src/Components/CustomerOnboarding/CnicDetail"));
const ReviewApplication = lazy(() => import("src/Components/CustomerOnboarding/ReviewApplication"));
const TermAndCondition = lazy(() => import("src/Components/CustomerOnboarding/TermAndCondition"));
const ApplicationComplete = lazy(() => import("src/Components/CustomerOnboarding/ApplicationComplete"));


export const SCREENS_FOR_PROGRESS_BAR = [
  'scr_deviceLocation',
  'scr_customerCnic',
  'scr_customerCnicResume',
  'scr_customerMobile',
  'scr_mobileVerification',
  'scr_hasValidEmail',
  'scr_customerEmail',
  'scr_emailVerification',
  'scr_livePhotoCapture',
  'scr_uploadCnicFront',
  'scr_uploadCnicBack',
  'scr_cnicDetail',
  'scr_additionalInformation',
  'scr_addressDetail',
  'scr_reviewApplication',
  'scr_termsAndConditions',
  'scr_applicationComplete',
  'src_updateCnicNumber'
]

export const showScreen = ({ CURRENT_SCREEN, isWebview }) => {

  const SCREEN_DICTIONARY = {
    // CUSTOMER ONBOARDING SCREENS
    scr_deviceLocation: <TermAndCondition />,
    scr_customerCnic: <CustomerCnic />,
    scr_customerCnicResume: <CustomerCnicResume />,
    scr_customerMobile: <CustomerMobile />,
    scr_mobileVerification: <MobileVerification />,
    scr_hasValidEmail: <HasValidEmail />,
    scr_customerEmail: <CustomerEmail />,
    scr_emailVerification: <EmailVerification />,
    scr_livePhotoCapture: (isMobile || isWebview) ? <LivePhotoForMobile /> : <LivePhotoForWeb />,
    // scr_uploadCnicFront: (isMobile || isWebview) ? <CnicFrontForMobile /> : <CnicFrontForWeb />,
    scr_uploadCnicFront: <CnicFrontForWeb />,
    // scr_uploadCnicBack: (isMobile || isWebview) ? <CnicBackForMobile /> : <CnicBackForWeb />,
    scr_uploadCnicBack: <CnicBackForWeb />,
    scr_cnicDetail: <CnicDetail />,
    scr_additionalInformation: <AdditionalInformation />,
    scr_addressDetail: <AddressDetail />,
    scr_reviewApplication: <ReviewApplication />,
    scr_termsAndConditions: <TermAndCondition />,
    scr_applicationComplete: <ApplicationComplete />,
    src_updateCnicNumber: <UpdateCnic />
  }
  return SCREEN_DICTIONARY[CURRENT_SCREEN]
}


const CustomerOnboarding = () => {
  const CURRENT_SCREEN = useSelector(state => state?.currentScreenState)
  const { state } = useLocation();
  const IS_ALLOWED = state?.isAllowed || false
  const isWebview = JSON.parse(sessionStorage.getItem('device')).deviceId !== 'temp'
  // isAllowed make it sure user can'nt access route directly.
  if (!IS_ALLOWED) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <WrapperForHookFormProps>
        {showScreen({ CURRENT_SCREEN, isWebview })}
      </WrapperForHookFormProps>
    </Suspense>
  );
};

export default CustomerOnboarding;
