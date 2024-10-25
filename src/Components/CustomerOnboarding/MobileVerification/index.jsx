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
import { maskNumber, retrieveMobileNumber } from "src/Utils/Helpers";
import { TbDeviceMobile as MobileVerificationIcon } from "react-icons/tb";
import { FaUserShield as HowToRegRoundedIcon } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setIsMobileOtpVerification } from "src/Redux/Reducers/CustomerState";
import { OPERATOR_OPTION } from "src/Utils/Constants";

const MobileVerification = ({
  title,
  content,
  control,
  getValues,
  errors,
  watch,
  handleSubmit,
  submitFormData
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNum, setMobileNum] = useState("");
  const [mobileOtp, setMobileOtp] = useState();
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [showVerification, setShowVerification] = useState(false); // for sms otp send
  const currentMobileValue = watch("customerMobile");

  useEffect(() => {
    const number = retrieveMobileNumber(currentMobileValue);
    const isValid = number.length === 11 && number.startsWith("03");
    setIsValidNumber(isValid);
  }, [currentMobileValue]);

  const handleProceedButton = (e) => {
    e.preventDefault();
    const customerMobileNumber = getValues("customerMobile");
    setMobileNum(customerMobileNumber);

    if (showVerification) {
      handleSubmit(submitFormData)();
      dispatch(setIsMobileOtpVerification(true));
      navigate("/customer-onboarding/email-verification");
      return;
    }

    setShowVerification(true);
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        {showVerification ? (
          <HowToRegRoundedIcon style={Roundediconstyles} />
        ) : (
          <MobileVerificationIcon style={Roundediconstyles} />
        )}
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{showVerification ? title : null}</Box>
      </Fade>

      {/* TEXT */}
      <Box sx={{ margin: "15px 0px" }}>
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>
            {showVerification
              ? `${content.verification} ${maskNumber(mobileNum)}`
              : content.enterMobileNumber}
          </Box>
        </Fade>

        {/* PHONE INPUT */}
        {!showVerification && (
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
        )}
      </Box>

      {/* OTP INPUT */}
      {showVerification && (
        <OtpInputComponent value={mobileOtp} setMobileOtp={setMobileOtp} />
      )}

      <VerificationButton
        onClick={handleProceedButton}
        disabled={showVerification ? mobileOtp?.length !== 6 : !isValidNumber}
        label={showVerification ? "Verify" : "Proceed"}
      />
    </>
  );
};

export default MobileVerification;
