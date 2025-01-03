import React from "react";
import Loader from "src/Common/Loader";
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";
import CustomButton from "src/Common/CustomButton";
import WizardLayout from "src/Layout/WizardLayout";
import { MdLocationOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";


const DeviceLocation = ({
  getValues,
  setValue,
}) => {
  const dispatch = useDispatch()
  const locationStatus = useGetGeoCoordinates({ setValue, getValues });

  const handleProceed = () => {
    const NEXT_SCREEN = "scr_customerCnic";
    dispatch(updateCurrentScreen(NEXT_SCREEN));

    const PREV_SCREEN = "scr_deviceLocation";
    dispatch(updatePrevScreen(PREV_SCREEN));
  }

  return (
    <>
      {locationStatus === "loading" && <Loader />}
      <WizardLayout
        Icon={MdLocationOn}
        title={"Device Location"}
        description={"Please enable your device location"}
      >
        <CustomButton type="button" label={"Proceed"} onClick={handleProceed} />
      </WizardLayout>
    </>
  );
};

export default DeviceLocation;
