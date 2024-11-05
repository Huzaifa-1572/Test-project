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
import { LIST_OF_PROVINCES } from "src/Utils/Constants";

const SelectProvince = ({
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
    navigate("/customer-onboarding/select-city");
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
              name={"customerProvince"}
              control={control}
              label={"Current Province"}
              options={LIST_OF_PROVINCES}
            />
            {errors?.customerProvince ? (
              <ValidationError message={errors?.customerProvince?.message} />
            ) : null}
          </Box>
        </Grid>
      </Grid>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default SelectProvince;
