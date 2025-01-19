import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoBack from "src/Common/Goback";
import ProgressBar from "src/Common/ProgressBar";
import Header from "src/Layout/Header";
import styles from "./index.module.scss";

const DONT_SHOW_BACK_BUTTON_ON_SCREENS = ['scr_customerMobile', 'scr_mobileVerification', 'scr_hasValidEmail', 'scr_customerEmail', 'scr_emailVerification', 'scr_livePhotoCapture', 'scr_applicationComplete'];

function CustomerOnboardingLayout({ setValue, getValues, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = localStorage.getItem("isEdit");
  const isResume = localStorage.getItem("isResume")
  const CURRENT_SCREEN = useSelector(state => state.currentScreenState);

  // Ensuring the component has loaded before rendering - for GoBack Button
  useEffect(() => {
    if (CURRENT_SCREEN) {
      setIsLoading(true);
    }
  }, [CURRENT_SCREEN]);

  const SHOW_BACK_BUTTON = isLoading && !(isEdit || DONT_SHOW_BACK_BUTTON_ON_SCREENS?.includes(CURRENT_SCREEN))

  return (
    <>
      <Header />

      <Box className={styles.contentContainer}>
        <Container maxWidth="xl" sx={{ padding: { xs: '10px 15px', md: '20px 40px' } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
              {
                SHOW_BACK_BUTTON &&
                <Box>
                  <GoBack setValue={setValue} getValues={getValues} />
                </Box>
              }
            </Grid>

            <Grid item xs={12} sm={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              {/* DONT SHOW PROGRESS BAR ON RESUME SCREENS */}
              {
                (CURRENT_SCREEN === 'scr_customerCnicResume') || (CURRENT_SCREEN === 'scr_mobileVerification' && isResume)
                  ? null : <ProgressBar />}
            </Grid>
          </Grid>
        </Container>

        <Container
          maxWidth="xl"
          sx={{
            padding: { xs: '10px 15px', md: '10px 40px' },
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}>
          {children}
        </Container>
      </Box>
    </>
  );
}

export default CustomerOnboardingLayout;