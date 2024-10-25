import { Box, Fade } from "@mui/material";
import React, { useRef, useState } from "react";
import { CustomInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import { MdCreditCard as CreditCardRoundedIcon } from "react-icons/md";
import { FaUserCheck as HowToRegRoundedIcon } from "react-icons/fa";
import {
  Contentstyles,
  Roundediconstyles,
  Headingstyles,
  Iconstyles,
} from "src/Utils/CommonStyles";
import { useNavigate } from "react-router-dom";
import { Verificationcondition } from "src/Utils/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { setIsVerification } from "src/Redux/Reducers/CustomerState";
import ReCAPTCHA from "react-google-recaptcha";
import OtpInputComponent from "src/Common/OtpInputComponent/OtpInputComponent";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import UserInformationModal from "src/Components/Modal/UserInformationModal";
import MutedText from "src/Common/MutedText";
import styles from "./index.module.scss";

const CnicVerification = ({
  title,
  content,
  resumecontent,
  control,
  errors,
}) => {
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

  const handleModalClose = () => {
    setdescrepantModal(false);
  };

  const handleProceedButton = (e) => {
    e.preventDefault()
    if (isResumeApplication) {
      dispatch(setIsVerification(true));
    }
    navigate('/customer-onboarding/mobile-verification')
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

export default CnicVerification;
