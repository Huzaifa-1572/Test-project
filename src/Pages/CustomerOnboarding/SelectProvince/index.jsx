import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import SelectProvinceComponent from "src/Components/CustomerOnboarding/SelectProvince";

const title = "Select Province";
const content = {
  description: "Please fill in the required information below",
};

const SelectProvince = () => {
  return (
    <WrapperForHookFormProps>
      <SelectProvinceComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default SelectProvince;
