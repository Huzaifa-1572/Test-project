import { Box, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInputComponent from "src/Common/OtpInputComponent/OtpInputComponent";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { maskEmail } from "src/Utils/Helpers";
import { FaUserShield as HowToRegRoundedIcon } from "react-icons/fa6";
import { IoMailOutline as EmailVerificationIcon } from "react-icons/io5";
import { setIsEmailOtpVerification } from "src/Redux/Reducers/CustomerState";
import { emailRegex } from "src/Utils/ValidationSchema";
import { useDispatch } from "react-redux";

const title = "Email Verification";
const content = {
  enterEmail: "Please enter Your email address",
  verification:
    "Please enter the one time passcode which is sent to your email address",
};

const CustomerEmail = ({
  control,
  getValues,
  errors,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const currentEmailValue = watch("customerEmail");

  useEffect(() => {
    const email = emailRegex.test(currentEmailValue);
    setValidEmail(email);
  }, [currentEmailValue]);

  const handleProceedButton = (e) => {
    e.preventDefault();
    const customerEmail = getValues("customerEmail");
    setEmail(customerEmail);

    if (showVerification) {
      handleSubmit(submitFormData)();
      dispatch(setIsEmailOtpVerification(true));
      navigate("/customer-onboarding/personal-information");
      return;
    }

    setShowVerification(true);
    setValidEmail(false);
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        {showVerification ? (
          <HowToRegRoundedIcon style={Roundediconstyles} />
        ) : (
          <EmailVerificationIcon style={Roundediconstyles} />
        )}
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>
          {showVerification ? title : content.enterEmail}
        </Box>
      </Fade>

      {/* CONTENT */}
      <Fade in={true} timeout={800}>
        <Box sx={Contentstyles}>
          {showVerification
            ? `${content.verification} ${maskEmail(email)}`
            : null}
        </Box>
      </Fade>

      {!showVerification && (
        <Box sx={{ marginTop: "20px 0px" }}>
          <TextInputField
            name={"customerEmail"}
            control={control}
            label="Email Address"
            placeholder="abc@gmail.com"
            type="mail"
          />
          {errors?.customerEmail ? (
            <ValidationError message={errors?.customerEmail?.message} />
          ) : null}
        </Box>
      )}

      {showVerification && (
        <OtpInputComponent value={mobileOtp} setMobileOtp={setMobileOtp} />
      )}

      <VerificationButton
        onClick={handleProceedButton}
        disabled={showVerification ? mobileOtp?.length !== 6 : !validEmail}
        label={showVerification ? "Verify OTP" : "Verify Email"}
      />
    </>
  );
};

export default CustomerEmail;
