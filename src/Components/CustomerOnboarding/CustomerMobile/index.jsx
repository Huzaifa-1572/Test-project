import { Box, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInputComponent from "src/Common/OtpInputComponent/OtpInputComponent";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { CustomInputField, SelectField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { maskNumber, retrieveMobileNumber, storeTokenToIndexDb, updateIndexDbData } from "src/Utils/Helpers";
import { TbDeviceMobile as MobileVerificationIcon } from "react-icons/tb";
import { FaUserShield as HowToRegRoundedIcon } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setIsMobileOtpVerification } from "src/Redux/Reducers/CustomerState";
import { OPERATOR_OPTION } from "src/Utils/Constants";
import usePostDataToServer from "src/Hooks/usePostdataToServer";

const title = "Mobile Verification";
const content = {
  enterMobileNumber: "Please enter Your mobile number",
  verification:
    "Please enter the one time passcode which is sent to your mobile number",
};

const CustomerMobile = ({
  control,
  errors,
  watch,
}) => {
  const dispatch = useDispatch();
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const currentMobileValue = watch("customerMobile");

  const { mutate: handleCustomerMobile } = usePostDataToServer({ onPostReqSuccess: onSuccessfullCustomerMobile, dispatch });

  useEffect(() => {
    const number = retrieveMobileNumber(currentMobileValue);
    const isValid = number.length === 11 && number.startsWith("03");
    setIsValidNumber(isValid);
  }, [currentMobileValue]);

  const handleProceedButton = (e) => {
    e.preventDefault();
    const API_URL = "http://192.168.20.101:8080/api/dao/v1/otp/sendsms";
    const BODY = {
      mobileNumber: "03459872345",
      isResumeApplication: false,
      custIdentityKey: "011",
      custIdentityValue: "1398765412345",
      channelCode: "09",
    };

    handleCustomerMobile({ BODY, API_URL });
  };

  async function onSuccessfullCustomerMobile(response) {
    console.log('jhbchjsdbhcjd', response.data.data.token);
    await updateIndexDbData('scr_mobileVerification')
    localStorage.setItem('tokenMobile',response?.data?.data?.token)
    // await storeTokenToIndexDb(response?.data?.data?.token);
    location.reload();
  }

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <MobileVerificationIcon style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{showVerification ? title : null}</Box>
      </Fade>

      {/* TEXT */}
      <Box sx={{ margin: "15px 0px" }}>
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>
            {content.enterMobileNumber}
          </Box>
        </Fade>

        {/* PHONE INPUT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "start" },
            gap: "20px",
            margin: "20px 0px",
          }}
        >
          <CustomInputField
            name={"customerMobile"}
            control={control}
            format={"####-#######"}
            label="Mobile Number"
            placeholder="03xx-xxxxxxx"
            inputMode="numeric"
          />
          {errors?.customerMobile ? (
            <ValidationError message={errors?.customerMobile?.message} />
          ) : null}

          <SelectField
            name={"customerOperator"}
            control={control}
            label={"Operator"}
            placeholder="Select Operator"
            options={OPERATOR_OPTION}
          />
          {errors?.customerOperator ? (
            <ValidationError message={errors?.customerOperator?.message} />
          ) : null}
        </Box>
      </Box>

      <VerificationButton
        onClick={handleProceedButton}
        disabled={!isValidNumber}
        label={"Proceed"}
      />
    </>
  );
};

export default CustomerMobile;
