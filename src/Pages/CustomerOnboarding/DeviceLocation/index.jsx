import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import DeviceLocationComponent from "src/Components/CustomerOnboarding/DeviceLocation";

const title = "Device Location";
const content = {
  description: "Please enable your device location to proceed further.",
};

const DeviceLocation = () => {
  return (
    <WrapperForHookFormProps>
      <DeviceLocationComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default DeviceLocation;
