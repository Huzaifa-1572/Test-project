import React from "react";
import CnicVerificationComponent from "src/Components/CustomerOnboarding/CnicVerification";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";

const title = "CNIC Verification";
const content = {
  enterNicNumber: "Please enter your CNIC to start your online application",
  verification: "Please enter the OTP which is sent to your mobile number",
};

const resumecontent = {
  enterNicNumber: "Please enter your CNIC to resume your online application",
  verification: "Please enter the OTP which is sent to your mobile number",
};

const CnicVerification = () => {
  return (
    <WrapperForHookFormProps>
      <CnicVerificationComponent
        title={title}
        content={content}
        resumecontent={resumecontent}
      />
    </WrapperForHookFormProps>
  );
};

export default CnicVerification;
