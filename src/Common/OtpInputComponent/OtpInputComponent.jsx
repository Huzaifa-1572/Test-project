import React from "react";
import OtpInput from "react-otp-input";
import { Box } from "@mui/material";
import Timer from "src/Common/Timer";

const MobileOtpStyles = {
  width: "100%",
  marginTop: "15px",
  display: "flex",
  justifyContent: { xs: "center", sm: "flex-start" },
  flexWrap: "wrap",
};

const EmailOtpStyles = {
  width: "100%",
  maxWidth: "clamp(40px, 8vw, 70px)",
  height: "clamp(40px, 8vw, 70px)",
  margin: "35px 0px",
  marginRight: "clamp(5px,1vw,20px)",
  fontSize: "clamp(16px, 4vw, 32px)",
  textAlign: "center",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
  background: "#252f37",
  color: "white",
};

const ResendOtpStyles = {
  margin: "20px 0px",
  display: "flex",
  justifyContent: {
    xs: "center",
    sm: "flex-start",
  },
};

const OtpInputComponent = ({
  value,
  setMobileOtp,
  onChange,
  postdataForOTP,
}) => {
  const handleOtpChange = (otp) => {
    setMobileOtp(otp || "");
  };

  const handleResendOtp = () => {
    setMobileOtp(null);
  };

  return (
    <>
      <Box sx={MobileOtpStyles}>
        <OtpInput
          value={value}
          onChange={handleOtpChange}
          numInputs={6}
          isInputNum={true}
          autoFocus={true}
          sx={{ maxWidth: "600px" }}
          renderInput={(props) => <input {...props} style={EmailOtpStyles} />}
        />
      </Box>

      <Box sx={ResendOtpStyles}>
        <Timer onClick={handleResendOtp} />
      </Box>
    </>
  );
};

export default OtpInputComponent;
