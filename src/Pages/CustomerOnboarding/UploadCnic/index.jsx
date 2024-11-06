import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import UploadCnicComponent from "src/Components/CustomerOnboarding/UploadCnic";

const title = "Upload CNIC";
const content = {
  description: "Kindly upload a clear image of your CNIC to proceed.",
};

const UploadCnic = () => {
  return (
    <WrapperForHookFormProps>
      <UploadCnicComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default UploadCnic;
