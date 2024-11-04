import { Box, Fade, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/VerificationButton/VerificationButton";
import {
  CheckboxField,
  CustomInputField,
  DateInputField,
  TextInputField,
} from "src/Components/FormFields";
import ValidationError from "src/Components/ValidationError";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { BiSolidUserDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";
import AccountOpeningSuccessModal from "src/Components/Modal/AccountOpeningSuccessModal";

const CnicDetail = ({
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
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
    navigate("/");
  };
  const handleSuccessModalOpen = () => setOpenSuccessModal(true);

  const handleProceedButton = (e) => {
    e.preventDefault();
    handleSuccessModalOpen();
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <BiSolidUserDetail style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{title}</Box>
      </Fade>

      {/* CONTENT */}
      {content?.description && (
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>{content?.description}</Box>
        </Fade>
      )}

      <Grid container sx={{ gap: "24px" }}>
        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerCnicName"}
                control={control}
                label="Name"
                placeholder="Name"
                type="text"
              />
              {errors?.customerCnicName ? (
                <ValidationError message={errors?.customerCnicName?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerGuardianName"}
                control={control}
                label="Father / Husband Name"
                placeholder="Father/Husband Name"
                type="text"
              />
              {errors?.customerGuardianName ? (
                <ValidationError
                  message={errors?.customerGuardianName?.message}
                />
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <CustomInputField
                name={"customerCnic"}
                control={control}
                format={"#####-#######-#"}
                label="CNIC"
                placeholder="xxxxx-xxxxxxx-x"
                inputMode="numeric"
              />
              {errors?.customerBOC ? (
                <ValidationError message={errors?.customerBOC?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <DateInputField
                name={"customerDOB"}
                control={control}
                label={"Date of Birth"}
              />
              {errors?.customerMotherName ? (
                <ValidationError
                  message={errors?.customerMotherName?.message}
                />
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <DateInputField
                name={"customerCnicIssuanceDate"}
                control={control}
                label={"Cnic Issuance Date"}
              />
              {errors?.customerCnicIssuanceDate ? (
                <ValidationError
                  message={errors?.customerCnicIssuanceDate?.message}
                />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <DateInputField
                name={"customerCnicExpiryDate"}
                control={control}
                label={"Cnic Expiry Date"}
              />
              {errors?.customerCnicExpiryDate ? (
                <ValidationError
                  message={errors?.customerCnicExpiryDate?.message}
                />
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <div className={styles.checkboxContainer}>
        <CheckboxField name={"customerCnicLTE"} control={control} />
        <label htmlFor={"customerCnicLTE"} className={styles.checkboxLabel}>
          My CNIC is valid for a lifetime.
        </label>
      </div>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />

      {openSuccessModal && (
        <AccountOpeningSuccessModal
          open={openSuccessModal}
          handleClose={handleSuccessModalClose}
        />
      )}
    </>
  );
};

export default CnicDetail;
