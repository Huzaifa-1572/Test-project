import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import PersonalInformationComponent from "src/Components/CustomerOnboarding/PersonalInformation";

const title = "Personal Information";
const content = {
  description: "Please fill in the required information below",
};

const PersonalInformation = () => {
  return (
    <WrapperForHookFormProps>
      <PersonalInformationComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default PersonalInformation;
