import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { shape } from "src/Utils/ValidationSchema";
import * as yup from "yup";

function WrapperForHookFormProps({ children }) {
  const CURRENT_SCREEN = useSelector(state => state?.screenState)

  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const { handleSubmit, control, setValue, trigger, getValues, watch, setError, reset, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  function submitFormData(data) {
    console.log(data);
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
      <CustomerOnboardingLayout>
        {childrenWithProps}
      </CustomerOnboardingLayout>
    </form>
  )
}

export default WrapperForHookFormProps;
