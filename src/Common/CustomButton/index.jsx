import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./index.module.scss";
import { IoMdArrowRoundForward } from "react-icons/io";

const CustomButton = ({ label, disabled, onClick, Icon, type = "submit" }) => {
  return (
    <Box className={styles.buttonContainer}>
      <Button
        type={type}
        variant="contained"
        disableElevation
        className={styles.button}
        sx={{ borderRadius: '999px' }}
        disabled={disabled}
        onClick={onClick}
      // endIcon={Icon || <IoMdArrowRoundForward />}
      >
        {label}
      </Button>
    </Box>
  );
};

export default CustomButton;
