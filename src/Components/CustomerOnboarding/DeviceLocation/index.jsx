import React from "react";
import Loader from "src/Common/Loader";
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";
import CustomButton from "src/Common/CustomButton";
import WizardLayout from "src/Layout/WizardLayout";
import { getScreenData } from "src/Utils/Helpers";

const DeviceLocation = ({
  getValues,
  setValue,
}) => {
  const { TITLE, DESCRIPTION } = getScreenData()
  const locationStatus = useGetGeoCoordinates({ setValue, getValues });

  return (
    <>
      {locationStatus === "loading" && <Loader />}
      <WizardLayout
        icon={"MdLocationOn"}
        title={TITLE}
        description={DESCRIPTION}
      >
        <CustomButton label={"Proceed"} />
      </WizardLayout>
    </>
  );
};

export default DeviceLocation;
