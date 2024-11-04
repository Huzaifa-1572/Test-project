import { Box, Fade } from "@mui/material";
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
import { HiIdentification } from "react-icons/hi2";

const CnicFront = ({
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedButton = (e) => {
    e.preventDefault();
    navigate("/customer-onboarding/upload-cnic-back");
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <HiIdentification style={Roundediconstyles} />
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

      <Box sx={{ maxWidth: "500px", width: "100%" }}>
        <UploadImage
          name={"customerCnicFront"}
          control={control}
          label={"CNIC Front"}
          getValues={getValues}
          setValue={setValue}
        />
        {errors?.customerCnicFront ? (
          <ValidationError message={errors?.customerCnicFront?.message} />
        ) : null}
      </Box>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default CnicFront;
