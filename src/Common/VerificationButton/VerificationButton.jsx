import React from "react";
import { Box, Button } from "@mui/material";

const VerificationButtonStyles = {
  maxWidth: "500px",
  width: "100%",
  border: "5px",
  marginTop: "20px",
  textAlign: "center",
  background: "#5093e0",
  color: "white", // Default color for the button
  "&:hover": {
    backgroundColor: "white",
    border: "2px solid #5093e0",
    color: "#5093e0",
  },
  "&.Mui-disabled": {
    opacity: 0.7,
    background: "#5093e0",
    color: "white", // Default color for the button
  },
};

const VerificationButton = ({ disabled, onClick, label }) => {
  return (
    <>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          type="submit"
          variant="contained"
          className="resumeApplication"
          sx={VerificationButtonStyles}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </Button>
      </Box>
    </>
  );
};

export default VerificationButton;
