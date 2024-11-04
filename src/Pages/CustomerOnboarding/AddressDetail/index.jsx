import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import AddressDetailComponent from "src/Components/CustomerOnboarding/AddressDetail";

const title = "Address Detail";
const content = {
  description: "Please fill in the required information below",
};

const AddressDetail = () => {
  return (
    <WrapperForHookFormProps>
      <AddressDetailComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default AddressDetail;
