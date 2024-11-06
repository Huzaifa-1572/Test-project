import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import TermAndConditionComponent from "src/Components/CustomerOnboarding/TermAndCondition";

const TermAndCondition = () => {
  return (
    <WrapperForHookFormProps>
      <TermAndConditionComponent />
    </WrapperForHookFormProps>
  );
};

export default TermAndCondition;
