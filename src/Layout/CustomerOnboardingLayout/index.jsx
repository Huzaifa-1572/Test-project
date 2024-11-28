import React from "react";
import { Box, Container } from "@mui/material";
import Header from "src/Layout/Header";
import GoBack from "src/Common/Goback";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";

const SCREENS = ['scr_customerCnic', 'scr_customerMobile', 'scr_mobileVerification', 'scr_hasValidEmail', 'scr_customerEmail', 'scr_emailVerification', 'scr_personalInformation']

function CustomerOnboardingLayout({ setValue, getValues, children }) {
  const EDITABLE = localStorage.getItem("isEditable");
  const CURRENT_SCREEN = useSelector(state => state.currentScreenState);

  return (
    <>
      <Header />
      <Box className={styles.onboardingContainer}>
        <Container maxWidth="xl">
          {
            !(EDITABLE || SCREENS.includes(CURRENT_SCREEN)) &&
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <GoBack setValue={setValue} getValues={getValues} />
            </Box>
          }
          {children}
        </Container>
      </Box>
    </>
  );
}

export default CustomerOnboardingLayout;
