import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const GoBack = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      size="small"
      variant="contained"
      onClick={handleBack}
      sx={{ fontSize: "12px", height: "40px" }}
    >
      Go Back
    </Button>
  );
};

export default GoBack;
