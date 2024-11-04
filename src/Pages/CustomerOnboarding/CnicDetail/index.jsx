import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import CnicDetailComponent from "src/Components/CustomerOnboarding/CnicDetail";

const title = "Cnic Detail";

const CnicDetail = () => {
  return (
    <WrapperForHookFormProps>
      <CnicDetailComponent title={title} />
    </WrapperForHookFormProps>
  );
};

export default CnicDetail;
