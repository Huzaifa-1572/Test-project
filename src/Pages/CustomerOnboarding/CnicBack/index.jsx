import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import CnicBackComponent from "src/Components/CustomerOnboarding/CnicBack";

const title = "Upload Back Side of CNIC";
const content = {
  description: "Kindly upload a clear image of the Back side of your CNIC to proceed.",
};

const CnicBack = () => {
  return (
    <WrapperForHookFormProps>
      <CnicBackComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default CnicBack;
