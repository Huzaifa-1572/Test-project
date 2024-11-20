import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import { COFormSubmission } from "src/Utils/CommonFunctions/COFormSubmission";
import postRequestSuccess from "src/Utils/CommonFunctions/postRequestSuccess";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { shape } from "src/Utils/ValidationSchema";
import * as yup from "yup";

function WrapperForHookFormProps({ children }) {
  const dispatch = useDispatch()
  const CURRENT_SCREEN = useSelector(state => state?.screenState)

  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const { handleSubmit, control, setValue, trigger, getValues, watch, setError, reset, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  // react query
  const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

  function submitFormData(data) {
    console.log(data);
    // const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN]
    // const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data, dispatch })
    // mutate({ BODY, API_URL, dispatch })
  }

  function onSuccessfullFormDataSubmission(response) {
    // postRequestSuccess({ response, dispatch, setValue })
  }

  const HOOK_FORM_PROPS = { control, errors, watch, setValue, trigger, getValues, reset, resetField, submitFormData, handleSubmit };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, HOOK_FORM_PROPS);
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit(submitFormData)}>
      {childrenWithProps}
    </form>
  )
}

export default WrapperForHookFormProps;
