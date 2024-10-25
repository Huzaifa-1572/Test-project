import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import styles from "./index.module.scss";
import { Iconstyles } from "src/Utils/CommonStyles";
import { FaCircleUser as AccountCircleRoundedIcon } from "react-icons/fa6";
import UserInformationModal from "src/Components/Modal/UserInformationModal";
import { useNavigate } from "react-router-dom";

const AccountForYourself = () => {
  const navigate = useNavigate();
  const [userInfoModal, setuserInfoModal] = useState(false);

  const handleFormYes = () => {
    navigate("/customer-onboarding/cnic-verification");
  };

  const handleFormNo = () => {
    setuserInfoModal(true);
  };
  const handleModalClose = () => {
    setuserInfoModal(false);
  };
  return (
    <>
      <Box>
        <Box sx={Iconstyles}>
          <AccountCircleRoundedIcon className={styles.onboarding} />
        </Box>

        <Fade in={true} timeout={800}>
          <Box className={styles.Agebox}>
            Are you filling this form for yourself?
          </Box>
        </Fade>

        <Grid container spacing={3} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              className={styles.yesButton}
              onClick={handleFormYes}
            >
              Yes
            </Button>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              className={styles.noButton}
              onClick={handleFormNo}
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
          title={"Form for individual use only!"}
          content={`National Savings digital onboarding form can only be filled for yourself. Submitting details on behalf of another person is strictly prohibited. Thank you for your understanding and cooperation.`}
        />
      )}
    </>
  );
};

export default AccountForYourself;
