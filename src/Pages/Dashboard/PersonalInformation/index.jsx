import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { FaUser } from "react-icons/fa";
import GoBack from "src/Common/Goback";

const PersonalInformation = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <FaUser
            style={{ color: "#37a862", fontSize: "30px", marginTop: "14px" }}
          />
          <Box>
            <Box
              sx={{
                fontSize: "clamp(16px,4vw,36px)",
                textTransform: "capitalize",
                color: "#484e53",
              }}
            >
              Personal Information
            </Box>
            <Box sx={{ fontSize: "10px", color: "#37a862", marginLeft: "4px" }}>
              Please fill in the required information below
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* {FIELDS?.map((field) => {
            return (
              <Grid
                sx={{ "& .MuiStack-root": { paddingTop: "0px" } }}
                key={field?.kuid}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={6}
              >
                {FormBuilder({ field, control, errors, maxDate })}
              </Grid>
            );
          })} */}
        </Grid>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <GoBack />
          <Button
            size="small"
            variant="contained"
            sx={{ fontSize: "12px", height: "40px" }}
            type="submit"
          >
            Save & Continue
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PersonalInformation;
