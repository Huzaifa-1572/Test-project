import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import styles from "./index.module.scss";
import { Iconstyles } from "src/Utils/CommonStyles";
import { IoMdInformationCircle as InfoIcon } from "react-icons/io";
import UserInformationModal from "src/Components/Modal/UserInformationModal";
import { useNavigate } from "react-router-dom";

const AgeConfirmation = () => {
  const navigate = useNavigate();
  const [userInfoModal, setuserInfoModal] = useState(false);

  const handleAgeYes = () => {
    navigate("/customer-onboarding/account-for-self");
  };

  const handleAgeNo = () => {
    setuserInfoModal(true);
  };
  const handleModalClose = () => {
    setuserInfoModal(false);
  };

  return (
    <>
      <Box>
        <Box sx={Iconstyles}>
          <InfoIcon className={styles.onboarding} />
        </Box>

        <Fade in={true} timeout={800}>
          <Box className={styles.Agebox}>Are you of 18 years or above age?</Box>
        </Fade>

        <Grid container spacing={3} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              className={styles.yesButton}
              onClick={handleAgeYes}
            >
              Yes
            </Button>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              className={styles.noButton}
              onClick={handleAgeNo}
            >
              No
            </Button>
          </Grid>
        </Grid>
      </Box>

      {userInfoModal && (
        <UserInformationModal
          open={userInfoModal}
          handleClose={handleModalClose}
          title={"Customer must be 18 years or older!"}
          content={`Digital onboarding process is only available for customers who are 18 years of age or older. Please come back when you're 18 or above to proceed with the account opening.Thank you for considering National Savings digital onboarding platform.`}
        />
      )}
    </>
  );
};

export default AgeConfirmation;
