import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import SelectCityComponent from "src/Components/CustomerOnboarding/SelectCity";

const title = "Select City";
const content = {
  description: "Please fill in the required information below",
};

const SelectCity = () => {
  return (
    <WrapperForHookFormProps>
      <SelectCityComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default SelectCity;
