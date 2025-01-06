import { useDispatch } from "react-redux";
import DEVICE_ICON from "src/Assets/images/locationIcon.png";
import LOCATION_UNDRAW from "src/Assets/images/abc.svg";
import CustomButton from "src/Common/CustomButton";
import Loader from "src/Common/Loader";
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";
import WizardLayout from "src/Layout/WizardLayout";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { updatePrevScreen } from "src/Redux/Reducers/PrevScreenState";


const DeviceLocation = ({
  getValues,
  setValue,
}) => {
  const dispatch = useDispatch()
  const { locationStatus, fetchLocation } = useGetGeoCoordinates({ setValue, getValues });

  const handleProceed = () => {
    const LOCATION = getValues("KEY_GEO_COORDINATES");
    if (!LOCATION) {
      fetchLocation();
      return;
    }

    const NEXT_SCREEN = "scr_customerCnic";
    dispatch(updateCurrentScreen(NEXT_SCREEN));

    const PREV_SCREEN = "scr_deviceLocation";
    dispatch(updatePrevScreen(PREV_SCREEN));
  }

  return (
    <>
      {locationStatus === "loading" && <Loader />}
      <WizardLayout
        Icon={DEVICE_ICON}
        title={"Device Location"}
        description={"We need your location to provide a personalized and seamless experience."}
        heroImage={LOCATION_UNDRAW}
      >
        <CustomButton type="button" label={"Continue"} onClick={handleProceed} />
      </WizardLayout>
    </>
  );
};

export default DeviceLocation;
