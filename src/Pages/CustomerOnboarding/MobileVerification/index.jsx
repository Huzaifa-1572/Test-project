import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import MobileVerificationComponent from "src/Components/CustomerOnboarding/MobileVerification";

const title = "Mobile Verification";
const content = {
  enterMobileNumber: "Please enter Your mobile number",
  verification:
    "Please enter the one time passcode which is sent to your mobile number",
};

const MobileVerification = () => {
  return (
    <WrapperForHookFormProps>
      <MobileVerificationComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default MobileVerification;
