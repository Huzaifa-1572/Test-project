import React from "react";
import WrapperForHookFormProps from "src/Layout/WrapperForHookFromProps";
import LivePhotoCaptureComponent from "src/Components/CustomerOnboarding/LivePhotoCapture";

const title = "Live Photo Capture";
const content = {
  description: "Kindly upload a clear live photo.",
};

const LivePhotoCapture = () => {
  return (
    <WrapperForHookFormProps>
      <LivePhotoCaptureComponent title={title} content={content} />
    </WrapperForHookFormProps>
  );
};

export default LivePhotoCapture;
