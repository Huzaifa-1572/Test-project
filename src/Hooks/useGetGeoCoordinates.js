import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";

const useGetGeoCoordinates = ({ setValue, getValues }) => {
  const dispatch = useDispatch();
  const [locationStatus, setLocationStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    const successCallback = (position) => {
      const coords = {
        Longitude: position.coords.longitude,
        Latitude: position.coords.latitude,
      };
      setValue("UserGeoCoordinates", JSON.stringify(coords));
      setLocationStatus("success"); // Location status successfully retrieved
    };

    const errorCallback = (error) => {
      console.error("Geolocation error:", error);
      setLocationStatus("success"); // Location status successfully retrieved
      setValue("UserGeoCoordinates", "");
      dispatch(
        showErrorModal({
          errorCode: "Geolocation Error",
          errorMessage:
            "Failed to retrieve location. Please enable location access in browser settings.",
          isError: true,
        })
      );
    };

    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationStatus("success"); // Location status successfully retrieved
      dispatch(
        showErrorModal({
          errorCode: "Geolocation Error",
          errorMessage:
            "Failed to retrieve location. Please enable location access in browser settings.",
          isError: true,
        })
      );
    }
  }, [dispatch, setValue]);

  return locationStatus; // Return loading, success, or error status
};

export default useGetGeoCoordinates;
