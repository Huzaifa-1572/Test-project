import React from "react";
import { Box, Container } from "@mui/material";
import Header from "src/Layout/Header";
import GoBack from "src/Common/Goback";
import styles from "./index.module.scss";

function CustomerOnboardingLayout({ setValue, getValues, children }) {
  const EDITABLE = localStorage.getItem("isEditable");
  
  return (
    <>
      <Header />
      <Box className={styles.onboardingContainer}>
        <Container maxWidth="xl">
          {
            !EDITABLE &&
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
