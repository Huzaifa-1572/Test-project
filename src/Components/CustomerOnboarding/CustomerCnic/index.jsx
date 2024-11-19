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
  updateIndexDbData,
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
