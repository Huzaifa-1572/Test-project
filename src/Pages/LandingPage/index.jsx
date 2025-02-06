import { Box, Container } from "@mui/material";
import Fade from '@mui/material/Fade';
import Grid from "@mui/material/Grid";
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PAYVAY from "src/Assets/images/PayvayLogo.png";
import Background from "src/Assets/images/background.png";
import OpenNewAccount from "src/Assets/images/openAccount.png";
import resumeAccount from "src/Assets/images/resumeAccount.png";
import heroImage from "src/Assets/images/wallet.png";
import HomePageLayout from "src/Layout/HomePageLayout";
import { updateCurrentScreen } from "src/Redux/Reducers/CurrentScreenState";
import { clearAppData } from "src/Utils/Helpers";
import styles from "./index.module.scss";
import { ClearPrevScreen } from "src/Redux/Reducers/PrevScreenState";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearAppData();
  }, []);

  const handleNewAccount = () => {
    const NEXT_SCREEN = "scr_deviceLocation";
    dispatch(updateCurrentScreen(NEXT_SCREEN));
    // isAllowed make it sure user can'nt access route directly.
    navigate("/customer-onboarding", { state: { isAllowed: true } });
  };

  const handleResumeApplication = () => {
    const NEXT_SCREEN = "scr_customerCnicResume";
    dispatch(updateCurrentScreen(NEXT_SCREEN));
    // isAllowed make it sure user can'nt access route directly.
    navigate("/customer-onboarding", { state: { isAllowed: true } });
  };

  return (
    <HomePageLayout>
      <Box className={styles.landingPageContainer} sx={{ padding: { xs: '0px', lg: '40px 80px' }, overflow: { lg: 'hidden' } }}>

        <Box className={styles.backgroundImageLeft} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <img src={Background} alt="" />
        </Box>
        <Box className={styles.backgroundImageRight} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <img src={Background} alt="" />
        </Box>

        <Container maxWidth="xl" className={styles.contentContainer} sx={{ padding: { xs: '30px', lg: 0 }, display: 'flex', alignItems: 'center', borderRadius: { lg: '15px' }, minHeight: '100%' }}>
          <Grid container spacing={2} sx={{ height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Grid item xs={12} xl={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <Fade in={true} timeout={{ enter: 1500, exit: 1000 }}>
                <Box className={styles.textContainer}>
                  <span> Account for Your Needs</span>
                  <br />
                  Start Your Journey with Payvay!
                  {/* <img className={styles.payvay} src={PAYVAY} alt="PAYVAY" /> */}
                </Box>
              </Fade>

              <Fade in={true} timeout={{ enter: 1500, exit: 1000 }}>
                <Box className={styles.descriptionText}>
                  Explore tailored features and benefits by selecting the account
                  <br />
                  type that aligns with your goals.
                </Box>
              </Fade>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={1}></Grid>
                {/* NEW ACCOUNT */}
                <Grid item xs={12} sm={5}>
                  <Zoom in={true} timeout={{ enter: 1000, exit: 500 }}>
                    <Box className={styles.card} onClick={handleNewAccount} sx={{ minHeight: { xs: '180px', md: '270px' } }}>
                      <img src={OpenNewAccount} alt="Open New Account" className={styles.cardImage} />
                      <Box className={styles.cardTitle}>
                        Start New Application
                      </Box>
                      <Box className={styles.cardDescription}>
                        Begin a fresh journey from the start
                      </Box>
                    </Box>
                  </Zoom>
                </Grid>

                {/* RESUME */}
                <Grid item xs={12} sm={5}>
                  <Zoom in={true} timeout={{ enter: 1000, exit: 500 }}>
                    <Box className={styles.card} onClick={handleResumeApplication} sx={{ minHeight: { xs: '180px', md: '270px' } }}>
                      <img src={resumeAccount} alt="Resume Application" className={styles.cardImage} />
                      <Box className={styles.cardTitle}>
                        Resume Application
                      </Box>
                      <Box className={styles.cardDescription}>
                        Continue right where you left off
                      </Box>
                    </Box>
                  </Zoom>
                </Grid>
                <Grid item xs={12} sm={1}></Grid>
              </Grid>
            </Grid>

            {/* FOR XL SCREENS ONLY */}
            <Grid item xl={6} sx={{ justifyContent: "center", alignItems: "center", display: { xs: 'none', xl: 'flex' } }}>
              <img src={heroImage} alt="WALLET" className={styles.heroImage} />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </HomePageLayout >
  );
};

export default LandingPage;
