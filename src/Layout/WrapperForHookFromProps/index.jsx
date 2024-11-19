import React, { useEffect } from "react";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { shape } from "src/Utils/ValidationSchema";
import { INITIAL_VALUES } from "src/Utils/Constants";
import { useSelector } from "react-redux";

function WrapperForHookFormProps({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const CURRENT_SCREEN = location.pathname.split("/")[2];

  const { isWelcome, isResumeApplication } = useSelector(
    (state) => state.customerState
  );

  console.log(isWelcome);
  

  useEffect(() => {
    if (!isWelcome && !isResumeApplication) {
      navigate("/");
    }
  }, [isWelcome, isResumeApplication]);

  const yupSchema = shape[CURRENT_SCREEN];
  const validationSchema = yup.object().shape(yupSchema);

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    watch,
    setError,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(validationSchema),
  });

  function submitFormData(data) {
    console.log(data);
  }

  const HOOK_FORM_PROPS = {
    control,
    errors,
    watch,
    setValue,
    trigger,
    getValues,
    reset,
    resetField,
    submitFormData,
    handleSubmit,
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, HOOK_FORM_PROPS);
    }
    return child;
  });

  return <form>{childrenWithProps}</form>;
}

export default WrapperForHookFormProps;
