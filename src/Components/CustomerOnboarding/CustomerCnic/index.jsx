import { Box, Fade } from "@mui/material";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaUserCheck as HowToRegRoundedIcon } from "react-icons/fa";
import { MdCreditCard as CreditCardRoundedIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MutedText from "src/Common/MutedText";
import OtpInputComponent from "src/Common/OtpInputComponent/OtpInputComponent";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { CustomInputField } from "src/Components/FormFields";
import UserInformationModal from "src/Components/Modal/UserInformationModal";
import ValidationError from "src/Components/ValidationError";
import usePostDataToServer from "src/Hooks/usePostdataToServer";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
  Verificationcondition,
} from "src/Utils/Helpers";
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
  const { isResumeApplication, isVerification } = useSelector(
    (state) => state.customerState
  );
  const [nicNum, setNicNum] = useState(false);
  const [showEmailVerification, setshowEmailVerification] = useState(false);
  const [isBot, setIsBot] = useState(true);
  const [maskedNumber, setMaskedNumber] = useState("");
  const [mobileOtp, setMobileOtp] = useState();
  const recaptchaValue = useRef("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [descrepantModal, setdescrepantModal] = useState(false);
  const discrepantReason = useRef("");
  const recaptchaRef = React.createRef();

  const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });
  const { mutate: handleCustomerExist } = usePostDataToServer({ onPostReqSuccess: successful, dispatch });

  const handleProceedButton = (e) => {
    e.preventDefault();
    // if (isResumeApplication) {
    //   dispatch(setIsVerification(true));
    // }
    // handleSubmit(submitFormData)();
    // navigate("/customer-onboarding/mobile-verification");

    // const API_URL = http://192.168.20.101:8080/api/dao/v1/authenticate
    const BODY = {
      reCaptchaToken: "1234",
      custIdentityKey: "011",
      custIdentityValue: "1398765412345",
      channelCode: "09",
    };

    const API_URL = "http://192.168.20.101:8080/api/dao/v1/authenticate";

    mutate({ BODY, API_URL });
  };

  // const handleResendClick = () => {
  //   setOtp('')
  //   const data = getValues()
  //   const CURRENT_SCREEN = IS_RESUME_FLOW ? 'scr135_resumeDAO' : ORIGINAL_SCREEN_FOR_VERIFICATION[SCREEN]

  //   const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN]
  //   const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data })
  //   mutate({ BODY, API_URL, dispatch })

  //   // Reset the timer to 60 seconds
  //   if (resendOTP === 0) {
  //     setResendOTP(60);
  //   }
  // };

  // when form is submitted successfully below function is called or if any error happen then onError function Defined in usePostDataToTransfer Will Be Called
  function onSuccessfullFormDataSubmission(response) {
    // const ISCUSTOMEREXIST = http://192.168.20.101:8080/api/dao/v1/customer/isExist

    //   mutate({ BODY, API_URL, dispatch })

    console.log("response", response?.data?.data?.token);
    localStorage.setItem("token", response?.data?.data?.token);

    const API_URL = "http://192.168.20.101:8080/api/dao/v1/customer/isExist";

    const BODY = {
      custIdentityKey: "011",
      custIdentityValue: "1398765412345",
      channelCode: "09",
    };

    handleCustomerExist({ BODY, API_URL });
  }

  function successful(response) {
    console.log("response", response);

    navigate("/customer-onboarding/mobile-verification");
  }

  const handleModalClose = () => {
    setdescrepantModal(false);
  };

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
        {isResumeApplication ? (
          <HowToRegRoundedIcon style={Roundediconstyles} />
        ) : (
          <CreditCardRoundedIcon style={Roundediconstyles} />
        )}
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>
          {isResumeApplication && "Resume Application"}
        </Box>
      </Fade>

      {!isResumeApplication ? (
        <Fade in={true} timeout={800}>
          <Box sx={Headingstyles}>
            {isResumeApplication ? "OTP Verification" : title}
          </Box>
        </Fade>
      ) : null}

      {/* CONTENT */}
      <Fade in={true} timeout={800}>
        <Box sx={Contentstyles}>
          {showEmailVerification &&
            "Please enter the one time passcode which is sent to your email address " +
            maskedEmail}
        </Box>
      </Fade>

      {!showEmailVerification && (
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>
            {isVerification
              ? `${content.verification} ${maskedNumber}`
              : isResumeApplication
                ? resumecontent.enterNicNumber
                : content.enterNicNumber}
          </Box>
        </Fade>
      )}

      {/* NIC INPUT */}
      {!isVerification && (
        <Box sx={{ margin: "20px 0px" }}>
          <CustomInputField
            name={"customerCnic"}
            control={control}
            format={"#####-#######-#"}
            label="CNIC"
            placeholder="xxxxx-xxxxxxx-x"
            inputMode="numeric"
          />
          {errors?.customerCnic ? (
            <ValidationError message={errors?.customerCnic?.message} />
          ) : null}
        </Box>
      )}

      {/* FOR OTP */}
      {isVerification && (
        <OtpInputComponent value={mobileOtp} setMobileOtp={setMobileOtp} />
      )}

      {/* BUTTON */}
      <VerificationButton
        onClick={handleProceedButton}
        disabled={!recaptchaValue.current}
        label={Verificationcondition(isVerification, isResumeApplication)}
      />
      {!isBot & !!nicNum || isVerification ? null : (
        <MutedText
          customText="CNIC & Recaptcha Are Required Fields!"
          textColor={"red"}
        />
      )}

      {/* RECAPTCHA */}
      {!isVerification && (
        <Box className={styles.robotStyles}>
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_REACT_APP_GOOGLE_CAPTCHA_KEY}
              onChange={onCaptchaChange}
            />
          </Box>
        </Box>
      )}

      {descrepantModal && (
        <UserInformationModal
          open={descrepantModal}
          handleClose={handleModalClose}
          title={"Discrepancies in Your Account Application"}
          content={() => {
            return (
              <>
                <Box className={styles.Discrepanciesboxstyles}>
                  Dear Customer! Just a quick heads-up, we noticed discrepancies
                  in your account application, Time to review your application
                  and update.
                </Box>

                <Box className={styles.Reasonboxstyles}>REASONS</Box>
                <Box className={styles.Boxstyles}>
                  {discrepantReason.current}
                </Box>
              </>
            );
          }}
        />
      )}
    </>
  );
};

export default CustomerCnic;
