import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "src/Layout/Header";
import GoBack from "src/Common/Goback";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";

const SCREENS = ['scr_customerCnic', 'scr_customerMobile', 'scr_mobileVerification', 'scr_hasValidEmail', 'scr_customerEmail', 'scr_emailVerification', 'scr_livePhotoCapture', 'scr_applicationComplete'];

function CustomerOnboardingLayout({ setValue, getValues, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = localStorage.getItem("isEdit");
  const CURRENT_SCREEN = useSelector(state => state.currentScreenState);

  // Ensuring the component has loaded before rendering - for GoBack Button
  useEffect(() => {
    if (CURRENT_SCREEN) {
      setIsLoading(true);
    }
  }, [CURRENT_SCREEN]);

  return (
    <>
      <Header />
      <Box className={styles.onboardingContainer}>
        {
          isLoading && !(isEdit || SCREENS.includes(CURRENT_SCREEN)) &&
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <GoBack setValue={setValue} getValues={getValues} />
          </Box>
        }
        {children}
      </Box >
    </>
  );
}

export default CustomerOnboardingLayout;