import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import EmailVerificationComponent from "src/Components/CustomerOnboarding/EmailVerification";

const title = "Email Verification";
const content = {
  enterEmail: "Please enter Your email address",
  verification:
    "Please enter the one time passcode which is sent to your email address",
};

const EmailVerification = () => {
  return (
    <WrapperForHookFormProps>
      <EmailVerificationComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default EmailVerification;
