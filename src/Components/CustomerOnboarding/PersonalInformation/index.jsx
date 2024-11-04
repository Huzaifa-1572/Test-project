import { Box, Fade, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import { SelectField, TextInputField } from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LIST_OF_CITIES } from "src/Utils/Constants";

const PersonalInformation = ({
  title,
  content,
  control,
  getValues,
  errors,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedButton = (e) => {
    e.preventDefault();
    navigate("/customer-onboarding/address-detail");
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <FaUser style={Roundediconstyles} />
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
        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerFirstName"}
                control={control}
                label="First Name"
                type="text"
              />
              {errors?.customerFirstName ? (
                <ValidationError message={errors?.customerFirstName?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerLastName"}
                control={control}
                label="Last Name"
                type="text"
              />
              {errors?.customerLastName ? (
                <ValidationError message={errors?.customerLastName?.message} />
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <SelectField
                name={"customerBOC"}
                control={control}
                label={"City/Place of Birth"}
                options={LIST_OF_CITIES}
              />
              {errors?.customerBOC ? (
                <ValidationError message={errors?.customerBOC?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerMotherName"}
                control={control}
                label="Mother Name"
                type="text"
              />
              {errors?.customerMotherName ? (
                <ValidationError
                  message={errors?.customerMotherName?.message}
                />
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default PersonalInformation;
