import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import CnicFrontComponent from "src/Components/CustomerOnboarding/CnicFront";

const title = "Upload Front Side of CNIC";
const content = {
  description: "Kindly upload a clear image of the front side of your CNIC to proceed.",
};

const CnicFront = () => {
  return (
    <WrapperForHookFormProps>
      <CnicFrontComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default CnicFront;
