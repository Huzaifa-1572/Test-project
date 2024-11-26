import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import { updateScreen } from "src/Redux/Reducers/ScreenState";
import { CNICEXIST_HANDLER, COFormSubmission, CUSTMOBILE_HANDLER } from "src/Utils/CommonFunctions/COFormSubmission";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { getDataFromIndexDb, storeDataToIndexDb } from "src/Utils/Helpers";
import { shape } from "src/Utils/ValidationSchema";
import * as yup from "yup";

function WrapperForHookFormProps({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CURRENT_SCREEN = useSelector((state) => state?.screenState);
  const currentScreenRef = useRef(CURRENT_SCREEN);

  // Update ref whenever CURRENT_SCREEN changes
  useEffect(() => {
    currentScreenRef.current = CURRENT_SCREEN;
  }, [CURRENT_SCREEN]);

  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const { handleSubmit, control, setValue, trigger, getValues, watch, setError, reset, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

  function submitFormData(data) {
    console.log('first', 'i am calling')
    const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN];
    const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data, dispatch });
    mutate({ BODY, API_URL, dispatch });
  }

  function onSuccessfullFormDataSubmission(response) {
    // For scr_customerCnic, handle dependent API calls
    const TOKEN = response?.data?.data?.token;
    const DATA = response?.data?.data
    const CUSTOMER_CNIC = getValues("customerCnic");

    if (CURRENT_SCREEN === "scr_customerCnic" && !!TOKEN) {
      localStorage.setItem("referenceKey", TOKEN);
      const { BODY, API_URL } = CNICEXIST_HANDLER({ CURRENT_SCREEN, CUSTOMER_CNIC, dispatch });
      mutate({ BODY, API_URL, dispatch });
    }

    if (!!DATA?.mobileNumber) {
      setValue('customerMobile', DATA?.mobileNumber)
      setValue('customerOperator', DATA?.mobileOperator)

      const RESUME_BODY = {
        customerCnic: CUSTOMER_CNIC,
        customerMobile: DATA?.mobileNumber,
        customerOperator: DATA?.mobileOperator
      }

      const { BODY, API_URL } = CUSTMOBILE_HANDLER({ CURRENT_SCREEN: 'scr_customerMobile', data: RESUME_BODY, isResumeApplication: true, dispatch });
      mutate({ BODY, API_URL, dispatch });
    }

    postRequestSuccess({ response, dispatch, navigate, setValue });
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
      console.log('datadsdsdata', data)
      const IS_STORED_DATA_AVAILABLE = !!data
      if (IS_STORED_DATA_AVAILABLE) {
        const SavedFormData = data?.appData?.FORMDATA
        const SavedCurrentScreen = data?.appData?.CURRENT_SCREEN
        dispatch(updateScreen(SavedCurrentScreen))
        reset(SavedFormData)
      }
      else {
        console.log('No stored data found.');
      }
    });


    // Update data on beforeunload
    const beforeUnloadHandler = async () => {
      const DATA_TO_STORE = {
        CURRENT_SCREEN: currentScreenRef.current,
        FORMDATA: getValues(),
      }
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
      <CustomerOnboardingLayout>
        {childrenWithProps}
      </CustomerOnboardingLayout>
    </form>
  );
}

export default WrapperForHookFormProps;
