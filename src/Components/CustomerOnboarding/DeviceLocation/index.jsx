import { Box, Fade, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { UploadImage } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { useDispatch } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import Loader from "src/Common/Loader";
import useGetGeoCoordinates from "src/Hooks/useGetGeoCoordinates";

const DeviceLocation = ({
  title,
  content,
  control,
  getValues,
  errors,
  setValue,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const locationStatus = useGetGeoCoordinates({ setValue, getValues });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedButton = (e) => {
    e.preventDefault();
    navigate("/customer-onboarding/address-detail");
  };

  return (
    <>
      {locationStatus === "loading" && <Loader />}
      {/* ICON */}
      <Box sx={Iconstyles}>
        <MdLocationOn style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{title}</Box>
      </Fade>

      {/* CONTENT */}
      {content.description && (
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>{content?.description}</Box>
        </Fade>
      )}

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default DeviceLocation;
