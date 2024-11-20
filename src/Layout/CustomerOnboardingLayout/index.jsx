import React from "react";
import { Box, Container, Fade } from "@mui/material";
import GoBack from "src/Common/Goback";
import styles from "./index.module.scss";
import Header from "src/Layout/Header";
import { GetIcon } from "src/Common/GetIcon";

function CustomerOnboardingLayout({ icon, title, description, children }) {
  return (
    <>
      <Header />
      <Box className={styles.onboardingContainer}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <GoBack />
          </Box>
          <Box className={styles.iconBox}>
            <GetIcon icon={icon} className={styles.icon} />
          </Box>
          <Fade in={true} timeout={800}>
            <Box className={styles.heading} sx={{ textAlign: { xs: "center", sm: "left" } }}>
              {title}
            </Box>
          </Fade>
          {description && (
            <Fade in={true} timeout={800}>
              <Box className={styles.content} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                {description}
              </Box>
            </Fade>
          )}
          {children}
        </Container>
      </Box>
    </>
  );
}

export default CustomerOnboardingLayout;
