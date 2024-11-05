import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import AdditionalInformationComponent from "src/Components/CustomerOnboarding/AdditionalInformation";

const title = "Additional Information";
const content = {
  description: "Please fill in the required information below",
};

const AdditionalInformation = () => {
  return (
    <WrapperForHookFormProps>
      <AdditionalInformationComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default AdditionalInformation;
