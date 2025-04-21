import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { showDeviceDecisionModal } from "src/Redux/Reducers/DeviceDecisionModalState";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";
import { UpdateScreenData } from "src/Redux/Reducers/ScreenDataState";
import { CNICEXIST_HANDLER, COFormSubmission, CUSTMOBILE_HANDLER } from "src/Utils/CommonFunctions/COFormSubmission";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { createHash, getDataFromIndexDb, getSHA256Hash, storeDataToIndexDb } from "src/Utils/Helpers";
import { shape } from "src/Utils/ValidationSchema";
import * as yup from "yup";

function WrapperForHookFormProps({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);
  const SCREEN_DATA = useSelector(state => state?.screenDataState);
  const PREVIOUS_SCREEN = useSelector(state => state?.prevScreenState)
  const currentScreenRef = useRef(CURRENT_SCREEN);
  const screenDataRef = useRef(SCREEN_DATA);
  const previousScreenRef = useRef(PREVIOUS_SCREEN);

  // Update ref whenever CURRENT_SCREEN or SCREEN_DATA changes
  useEffect(() => {
    currentScreenRef.current = CURRENT_SCREEN;
  }, [CURRENT_SCREEN]);

  // Update ref when SCREEN_DATA changes
  useEffect(() => {
    screenDataRef.current = SCREEN_DATA;
  }, [SCREEN_DATA]);

  useEffect(() => {
    previousScreenRef.current = PREVIOUS_SCREEN;
  }, [PREVIOUS_SCREEN]);



  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const { handleSubmit, control, setValue, trigger, getValues, watch, setError, reset, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

  function submitFormData(data) {
    const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN];
    const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data, dispatch });
    mutate({ BODY, API_URL, dispatch });
  }

  function onSuccessfullFormDataSubmission(response) {
    // For scr_customerCnic, handle dependent API calls
    const TOKEN = response?.data?.data?.token;
    const DATA = response?.data?.data;
    const CUSTOMER_CNIC = getValues("customerCnic");
    const { prev_screen_kuid } = DATA

    // FOR SECOND CALL ON CUSTOMER CNIC SCREEN
    if ((CURRENT_SCREEN === "scr_customerCnic" || CURRENT_SCREEN === "scr_customerCnicResume") && !!TOKEN) {
      localStorage.setItem("referenceKey", TOKEN);
      const { BODY, API_URL } = CNICEXIST_HANDLER({ CURRENT_SCREEN, CUSTOMER_CNIC, dispatch });
      mutate({ BODY, API_URL, dispatch });
    }

    // FOR RESUME FLOW
    if (DATA?.resume) {
      const CUSTOMER_DEVICE_ID_LATEST = JSON.parse(sessionStorage.getItem('device'))?.deviceId || null
      const CUSTOMER_DEVICE_ID_PREVIOUS = DATA?.deviceID
      if ((CUSTOMER_DEVICE_ID_LATEST !== CUSTOMER_DEVICE_ID_PREVIOUS) && (CUSTOMER_DEVICE_ID_PREVIOUS !== undefined)) {
        dispatch(
          showDeviceDecisionModal({
            title: "Device Change Detected",
            description: `Dear Customer! You have previously registered with device ${CUSTOMER_DEVICE_ID_PREVIOUS}. Do you want to continue using the current device?`,
            isDeviceDecisionModal: true,
          })
        )
      }

      localStorage.setItem("isResume", DATA?.resume);
      setValue('customerMobile', DATA?.mobileNumber);
      setValue('customerOperator', DATA?.mobileOperator);

      const RESUME_BODY = {
        customerCnic: CUSTOMER_CNIC,
        customerMobile: DATA?.mobileNumber,
        customerOperator: DATA?.mobileOperator
      };
      const { BODY, API_URL } = CUSTMOBILE_HANDLER({ CURRENT_SCREEN: 'scr_customerMobile', data: RESUME_BODY, isResumeApplication: DATA?.resume, dispatch });
      mutate({ BODY, API_URL, dispatch });
    }

    // FOR OTP BYPASS TO CLEAR VAPT REPORT
    if ((prev_screen_kuid === 'scr_mobileVerification') || (prev_screen_kuid === 'scr_emailVerification')) {
      let entity = ''
      const { CUSTOMER_OTP } = getValues()
      const { election, mobileNumber, email } = DATA
      const hashedOtp = getSHA256Hash(CUSTOMER_OTP)

      if (prev_screen_kuid === 'scr_mobileVerification') {
        entity = mobileNumber
      }
      else {
        entity = email
      }

      const isValidHash = createHash({ hashedOtp, entity }) === election

      if (isValidHash) postRequestSuccess({ response, dispatch, navigate, setValue });

      else {
        dispatch(showErrorModal({
          errorCode: "Oh no!", errorMessage: "Something went wrong.Please Try Again Later.", isError: true,
        }));
      }
    }
    else {
      postRequestSuccess({ response, dispatch, navigate, setValue });
    }
  }

  const HOOK_FORM_PROPS = { control, errors, watch, setValue, trigger, getValues, reset, resetField, submitFormData, handleSubmit };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, HOOK_FORM_PROPS);
    }
    return child;
  });

  // PERSISTING VALUES WHEN PAGE IS REFRESHED
  useEffect(() => {
    getDataFromIndexDb().then(data => {
      const IS_STORED_DATA_AVAILABLE = !!data;
      if (IS_STORED_DATA_AVAILABLE) {
        const SavedFormData = data?.appData?.FORMDATA;
        const SavedCurrentScreen = data?.appData?.CURRENT_SCREEN;
        const SavedPreviousScreen = data?.appData?.PREVIOUS_SCREEN
        const SavedScreenData = data?.appData?.SCREEN_DATA;
        dispatch(UpdateScreenData(SavedScreenData));
        dispatch(updateCurrentScreen(SavedCurrentScreen));
        dispatch(updatePrevScreen(SavedPreviousScreen))
        reset(SavedFormData);
      }
      else {
        console.log('No stored data found.');
      }
    });

    // Update data on beforeunload
    const beforeUnloadHandler = async () => {
      const DATA_TO_STORE = {
        CURRENT_SCREEN: currentScreenRef.current,
        SCREEN_DATA: screenDataRef.current,
        PREVIOUS_SCREEN: previousScreenRef.current,
        FORMDATA: getValues(),
      };
      await storeDataToIndexDb(DATA_TO_STORE);
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(submitFormData)}>
      <CustomerOnboardingLayout {...HOOK_FORM_PROPS}>
        {childrenWithProps}
      </CustomerOnboardingLayout>
    </form>
  );
}

export default WrapperForHookFormProps;
