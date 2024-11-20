import { Box, Fade } from "@mui/material";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { MdCreditCard as CreditCardRoundedIcon } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MutedText from "src/Common/MutedText";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { CustomInputField, CaptchaField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import CustomerOnboardingLayout from "src/Layout/CustomerOnboardingLayout";
import { Headingstyles, Iconstyles, Roundediconstyles } from "src/Utils/CommonStyles";
import styles from "./index.module.scss";














const title = "CNIC Verification";
const content = {
  enterNicNumber: "Please enter your CNIC to start your online application",
  verification: "Please enter the OTP which is sent to your mobile number",
};

const resumecontent = {
  enterNicNumber: "Please enter your CNIC to resume your online application",
  verification: "Please enter the OTP which is sent to your mobile number",
};

const CustomerCnic = ({ control, errors }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBot, setIsBot] = useState(true);
  const recaptchaValue = useRef("");
  const recaptchaRef = React.createRef();

  const { mutate: handleCustomerAuthenticate } = usePostDataToServer({ onPostReqSuccess: onSuccessfulCustomerAuthenticate, dispatch });
  const { mutate: handleCustomerExist } = usePostDataToServer({ onPostReqSuccess: onSuccessfulCustomerExist, dispatch });

  const handleProceedButton = (e) => {
    e.preventDefault();
    const BODY = {
      custIdentityKey: "011",
      channelCode: "09",
      reCaptchaToken: "1234",
      custIdentityValue: "1398765412345",
    };
    const API_URL = "http://192.168.20.101:8080/api/dao/v1/authenticate";
    handleCustomerAuthenticate({ BODY, API_URL });
  };

  function onSuccessfulCustomerAuthenticate(response) {
    console.log("response", response?.data?.data?.token);
    localStorage.setItem("token", response?.data?.data?.token);
    const API_URL = "http://192.168.20.101:8080/api/dao/v1/customer/isExist";
    const BODY = {
      custIdentityKey: "011",
      channelCode: "09",
      custIdentityValue: "1398765412345",
    };

    handleCustomerExist({ BODY, API_URL });
  }

  function onSuccessfulCustomerExist(response) {
    updateIndexDbData('scr_customerMobile')
    location.reload();
  }

  const onCaptchaChange = (value) => {
    recaptchaValue.current = value;
    if (value) {
      setIsBot(false);
    } else {
      setIsBot(true);
    }
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>

        <CreditCardRoundedIcon style={Roundediconstyles} />
      </Box>

      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>
          {title}
        </Box>
      </Fade>


      {/* NIC INPUT */}
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


      {/* BUTTON */}
      <VerificationButton
        // onClick={handleProceedButton}
        type='submit'
        // disabled={!recaptchaValue.current}
        label='verify'
      />

      {/* RECAPTCHA */}
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
    </>
  )
};

export default CustomerCnic;
