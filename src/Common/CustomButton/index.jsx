import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./index.module.scss";
import { IoMdArrowRoundForward } from "react-icons/io";

const CustomButton = ({ label, disabled, onClick, type = "submit" }) => {
  return (
    <Box className={styles.buttonContainer}>
      <Button
        type={type}
        variant="contained"
        className={styles.button}
        disabled={disabled}
        onClick={onClick}

      >
        {label} <IoMdArrowRoundForward />
      </Button>
    </Box>
  );
};

export default CustomButton;
