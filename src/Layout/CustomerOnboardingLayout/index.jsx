import React from "react";
import { Box, Container } from "@mui/material";
import GoBack from "src/Common/Goback";
import styles from "./index.module.scss";
import Header from "src/Layout/Header";

function CustomerOnboardingLayout({ children }) {
  return (
    <>
      <Header />
      <Box className={styles.onboardingContainer}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <GoBack />
          </Box>
          {children}
        </Container>
      </Box>
    </>
  );
}

export default CustomerOnboardingLayout;
