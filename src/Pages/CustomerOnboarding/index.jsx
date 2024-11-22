import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDataFromIndexDb, storeDataToIndexDb } from "src/Utils/Helpers";
const WrapperForHookFormProps = lazy(() => import("src/Layout/WrapperForHookFromProps"));

// Customer Onboarding Screens
const CustomerCnic = lazy(() => import("src/Components/CustomerOnboarding/CustomerCnic"));
const CustomerMobile = lazy(() => import("src/Components/CustomerOnboarding/CustomerMobile"));
const MobileVerification = lazy(() => import("src/Components/CustomerOnboarding/MobileVerfication"));
const HasValidEmail = lazy(() => import("src/Components/CustomerOnboarding/HasValidEmail"));
const CustomerEmail = lazy(() => import("src/Components/CustomerOnboarding/CustomerEmail"));
const EmailVerification = lazy(() => import("src/Components/CustomerOnboarding/EmailVerification"));
const PersonalInformation = lazy(() => import("src/Components/CustomerOnboarding/PersonalInformation"));
const AdditionalInformation = lazy(() => import("src/Components/CustomerOnboarding/AdditionalInformation"));
const DeviceLocation = lazy(() => import("src/Components/CustomerOnboarding/DeviceLocation"));
const AddressDetail = lazy(() => import("src/Components/CustomerOnboarding/AddressDetail"));
const LivePhotoCapture = lazy(() => import("src/Components/CustomerOnboarding/LivePhotoCapture"));
const UploadCnic = lazy(() => import("src/Components/CustomerOnboarding/UploadCnic"));
const CnicDetail = lazy(() => import("src/Components/CustomerOnboarding/CnicDetail"));
const TermAndCondition = lazy(() => import("src/Components/CustomerOnboarding/TermAndCondition"));

const showScreen = {
  // CUSTOMER ONBOARDING SCREENS
  scr_customerCnic: <CustomerCnic />,
  scr_customerMobile: <CustomerMobile />,
  scr_mobileVerification: <MobileVerification />,
  scr_hasValidEmail: <HasValidEmail />,
  scr_customerEmail: <CustomerEmail />,
  scr_emailVerification: <EmailVerification />,
  scr_personalInformation: <PersonalInformation />,
  scr_additionalInformation: <AdditionalInformation />,
  scr_deviceLocation: <DeviceLocation />,
  scr_addressDetail: <AddressDetail />,
  scr_livePhotoCapture: <LivePhotoCapture />,
  scr_uploadCnic: <UploadCnic />,
  scr_cnicDetail: <CnicDetail />,
  scr_termAndCondition: <TermAndCondition />,
};

const CustomerOnboarding = () => {
  const CURRENT_SCREEN = useSelector(state => state?.screenState)

  // PERSISTING VALUES WHEN PAGE IS REFRESHED
  // useEffect(() => {

  //   getDataFromIndexDb().then(data => {

  //     console.log('datadsdsdata', data)
  //     // if (data && data.formFields) {
  //     //   const SavedData = data.formFields
  //     //   reset(SavedData)
  //     // }
  //     // else {
  //     //   console.log('No stored data found.');
  //     // }
  //   });
  //   console.log('whopsss i am back')


  //   // Update data on beforeunload
  //   const beforeUnloadHandler = async () => {
  //     const DATA_TO_STORE = {
  //       // CURRENT_SCREEN: CURRENT_SCREEN,
  //       // FORMFIELDS: getValues(),
  //       TOKEN: '123456'
  //     }
  //     await storeDataToIndexDb(DATA_TO_STORE);
  //   };
  //   window.addEventListener('beforeunload', beforeUnloadHandler);

  //   // Remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', beforeUnloadHandler);
  //   };
  // }, []);


  return (
    <WrapperForHookFormProps>
      {showScreen[CURRENT_SCREEN]}
    </WrapperForHookFormProps>
  );
};

export default CustomerOnboarding;
