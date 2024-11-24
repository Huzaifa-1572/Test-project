import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import { CNICEXIST_HANDLER, COFormSubmission } from "src/Utils/CommonFunctions/COFormSubmission";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { getDataFromIndexDb, storeDataToIndexDb } from "src/Utils/Helpers";
import { shape } from "src/Utils/ValidationSchema";
import * as yup from "yup";



function WrapperForHookFormProps({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const CURRENT_SCREEN = useSelector(state => state?.screenState)

  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const { handleSubmit, control, setValue, trigger, getValues, watch, setError, reset, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

  function submitFormData(data) {
    const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN]
    const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data, dispatch })
    mutate({ BODY, API_URL, dispatch })
  }

  function onSuccessfullFormDataSubmission(response) {
    // BECAUSE scr_customerCnic HAS DEPENDENT API CALL (CNICEXIST_HANDLER DEPENDS ON AUTHENTICATION_HANDLER)
    // -------------------START
    const TOKEN = response?.data?.data?.token;
    if (CURRENT_SCREEN === "scr_customerCnic" && !!TOKEN) {
      const customerCnic = getValues("customerCnic");
      const { BODY, API_URL } = CNICEXIST_HANDLER({ CURRENT_SCREEN, customerCnic, dispatch });
      mutate({ BODY, API_URL, dispatch });
    }
    // --------------------END

    postRequestSuccess({ response, dispatch, navigate, setValue })
  }

  const HOOK_FORM_PROPS = { control, errors, watch, setValue, trigger, getValues, reset, resetField, submitFormData, handleSubmit };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, HOOK_FORM_PROPS);
    }
    return child;
  });


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


  //   // Update data on beforeunload
  //   const beforeUnloadHandler = async () => {
  //     const DATA_TO_STORE = {
  //       CURRENT_SCREEN: CURRENT_SCREEN,
  //       FORMFIELDS: getValues(),
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
    <form onSubmit={handleSubmit(submitFormData)}>
      <CustomerOnboardingLayout>
        {childrenWithProps}
      </CustomerOnboardingLayout>
    </form>
  )
}

export default WrapperForHookFormProps;
