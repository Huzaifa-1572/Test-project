import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoBack from "src/Common/Goback";
import ProgressBar from "src/Common/ProgressBar";
import Header from "src/Layout/Header";
import styles from "./index.module.scss";

const DONT_SHOW_BACK_BUTTON_ON_SCREENS = [
  'scr_customerMobile',
  'scr_mobileVerification',
  'scr_hasValidEmail',
  'scr_customerEmail',
  'scr_emailVerification',
  'scr_livePhotoCapture',
  'scr_reviewApplication',
  'scr_applicationComplete'
];
const DONT_SHOW_PROGRESS_BAR = [
  'scr_customerCnicResume',
  'scr_applicationComplete'
]

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
      <Header
        SHOW_BACK_BUTTON={SHOW_BACK_BUTTON}
        setValue={setValue}
        getValues={getValues}
      />

      <Box className={styles.contentContainer}>
        <Container maxWidth="xl" sx={{ padding: { xs: '20px 5px', md: '10px 40px' } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-start' }}>
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
                DONT_SHOW_PROGRESS_BAR?.includes(CURRENT_SCREEN) || (CURRENT_SCREEN === 'scr_mobileVerification' && isResume)
                  ? null : <ProgressBar />}
            </Grid>
          </Grid>
        </Container>

        <Container
          maxWidth="xl"
          sx={{
            padding: { md: '10px 40px' },
            flex: 1,
            display: 'flex',
            alignItems: { xs: 'stretch', sm: 'center' },
          }}>
          {children}
        </Container>
      </Box>
    </>
  );
}

export default CustomerOnboardingLayout;







