import { Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "src/Common/CustomButton";
import { CaptchaField, CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import styles from "./index.module.scss";

const CustomerCnic = ({ control, errors }) => {
  const dispatch = useDispatch();
  const recaptchaRef = React.createRef();
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const { mutate: handleCustomerAuthenticate } = usePostDataToServer({ onPostReqSuccess: onSuccessfulCustomerAuthenticate, dispatch });
  const { mutate: handleCustomerExist } = usePostDataToServer({ onPostReqSuccess: onSuccessfulCustomerExist, dispatch });

  const handleProceedButton = (e) => {
    e.preventDefault();
    const BODY = {
      custIdentityKey: "011",
      channelCode: "09",
      reCaptchaToken: recaptchaValue, // Use updated value
      custIdentityValue: "1398765412345",
    };
    const API_URL = "http://192.168.20.101:8080/api/dao/v1/authenticate";
    handleCustomerAuthenticate({ BODY, API_URL });
  };

  function onSuccessfulCustomerAuthenticate(response) {
    console.log("response", response?.data?.data?.token);
    localStorage.setItem("token", response?.data?.data?.token);
    const API_URL = "http://10.6.60.6:8089/api/dao/v1/customer/isExist";
    const BODY = {
      custIdentityKey: "011",
      channelCode: "09",
      custIdentityValue: "13987654123",
    };

    handleCustomerExist({ BODY, API_URL });
  }

  function onSuccessfulCustomerExist(response) {
    updateIndexDbData("scr_customerMobile");
    location.reload();
  }

  const onCaptchaChange = (value) => {
    setRecaptchaValue(value); // Update state instead of ref
  };

  return (
    <CustomerOnboardingLayout
      icon={"MdCreditCard"}
      title={"CNIC Verification"}
      description={"Please enter your CNIC to start your online application."}
    >
      <Box sx={{ margin: "20px 0px" }}>
        <CustomInputField
          name={"customerCnic"}
          control={control}
          format={"#####-#######-#"}
          label="CNIC"
          placeholder="xxxxx-xxxxxxx-x"
          inputMode="numeric"
        />
        {errors?.customerCnic ? (<ValidationError message={errors?.customerCnic?.message} />) : null}
      </Box>

      <CustomButton
        label="verify"
      // onClick={handleProceedButton}
      />

      <Box className={styles.robotStyles}>
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          {/* <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
            onChange={onCaptchaChange}
          /> */}

          {console.log('errors', errors)}

          <CaptchaField name={'googleCaptcha'} control={control}
            siteKey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY} />
          {errors?.googleCaptcha ? (<ValidationError message={errors?.googleCaptcha?.message} />) : null}
        </Box>
      </Box>
    </CustomerOnboardingLayout>
  );
};

export default CustomerCnic;