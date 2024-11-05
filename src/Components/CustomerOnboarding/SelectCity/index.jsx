import { Box, Fade, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { useDispatch } from "react-redux";
import { BiBuildingHouse } from "react-icons/bi";
import { SelectField } from "src/Components/FormFields";
import { LIST_OF_CITIES } from "src/Utils/Constants";

const SelectCity = ({
  title,
  content,
  control,
  getValues,
  errors,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const latitude = 37.7749; // Example latitude (e.g., San Francisco)
  const longitude = -122.4194; //
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedButton = (e) => {
    e.preventDefault();
    navigate("/customer-onboarding/live-photo-capture");
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <BiBuildingHouse style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{title}</Box>
      </Fade>

      {/* CONTENT */}
      <Fade in={true} timeout={800}>
        <Box sx={Contentstyles}>{content?.description}</Box>
      </Fade>

      <Grid container sx={{ gap: "24px" }}>
        <Grid item xs={12} md={6} lg={4}>
          <Box>
            <SelectField
              name={"customerCity"}
              control={control}
              label={"Current City"}
              options={LIST_OF_CITIES}
            />
            {errors?.customerCity ? (
              <ValidationError message={errors?.customerCity?.message} />
            ) : null}
          </Box>
        </Grid>
      </Grid>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default SelectCity;
