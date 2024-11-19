import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Button, Grow } from "@mui/material";
import { IoPlay as PlayArrowIcon } from "react-icons/io5";
import { MdOutlineOpenInBrowser as OpenInBrowserIcon } from "react-icons/md";
import HeroImage from "src/Assets/images/hero.png";
import styles from "./index.module.scss";
import {
  setIsResumeApplication,
  setIsWelcome,
} from "src/Redux/Reducers/CustomerState";
import { useDispatch } from "react-redux";
import { updateScreen } from "src/Redux/Reducers/ScreenState";
import { storeDataToIndexDb } from "src/Utils/Helpers";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewAccount = () => {
    const NEW_SCREEN = "scr_customerCnic";
    dispatch(setIsWelcome(true));
    dispatch(updateScreen(NEW_SCREEN));
    storeDataToIndexDb(NEW_SCREEN)
    navigate("/customer-onboarding");
  };

  const handleResumeApplication = () => {
    dispatch(setIsResumeApplication(true));
    navigate("/customer-onboarding");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* COLUMN 1 */}
          <Grid item xs={12} md={7} className={styles.landingPageLeftSide}>
            <Grow in={true} timeout={800}>
              <Box className={styles.mainHeading}>
                Welcome To{" "}
                <span className={styles.mainHeadingSpan}>Cerisma </span> Digital
                Onboarding
              </Box>
            </Grow>

            <Grow in={true} timeout={800}>
              <Box className={styles.mainSubHeading}>
                Open Your Future,{" "}
                <span className={styles.mainHeadingSpan}>
                  Anytime, Anywhere!
                </span>
              </Box>
            </Grow>

            <Box
              className={`${styles.description} ${styles.Descriptionstyles}`}
            >
              Cerisma, Your Nation's Bank, Introduces Convenient Digital Account
              Opening. Unlock the Power to Open Cerisma, Digital wallet, All
              from the Comfort of Your Home. No Need to Visit Cerisma Centers.{" "}
            </Box>

            <div className={styles.buttonContainer}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    className={styles.buttonContainerstyles}
                    startIcon={<OpenInBrowserIcon />}
                    onClick={handleNewAccount}
                  >
                    Open New Account
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    className={styles.buttonContainerstyles}
                    startIcon={<PlayArrowIcon />}
                    onClick={handleResumeApplication}
                  >
                    Resume Application
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* COLUMN 2 */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Grow in={true} timeout={800}>
              <img
                src={HeroImage}
                alt="illustration"
                width={"100%"}
                height={"100%"}
                style={{
                  filter: "drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.5))",
                }}
              />
            </Grow>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
