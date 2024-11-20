import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/CustomButton";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import { useDispatch } from "react-redux";
import { BiBuildingHouse } from "react-icons/bi";
import { SelectField, TextInputField } from "src/Components/FormFields";
import { LIST_OF_CITIES, LIST_OF_PROVINCES } from "src/Utils/Constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GOOGLE_MAP_IMG from "src/Assets/images/google_map_img.jpg";
import styles from "./index.module.scss";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const API_KEY = "AIzaSyAXQuFFo_bQ_RU42-1NtDLPIA9EXsOLDsQ";

const title = "Address Detail";
const content = {
  description: "Please fill in the required information below",
};

const AddressDetail = ({
  control,
  getValues,
  errors,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const latitude = 37.7749; // Example latitude (e.g., San Francisco)
  const longitude = -122.4194; //
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleProceedButton = (e) => {
    e.preventDefault();
    if (open) {
      handleClose();
      return;
    }
    navigate("/customer-onboarding/live-photo-capture");
  };

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <BiBuildingHouse style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{title}</Box>
      </Fade>

      {/* CONTENT */}
      <Fade in={true} timeout={800}>
        <Box sx={Contentstyles}>{content?.description}</Box>
      </Fade>

      <Grid container sx={{ gap: "24px" }}>
        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerAddress"}
                control={control}
                label="Address"
                type="text"
              />
              {errors?.customerAddress ? (
                <ValidationError message={errors?.customerAddress?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <TextInputField
                name={"customerLandmark"}
                control={control}
                label="Landmark"
                type="text"
              />
              {errors?.customerLandmark ? (
                <ValidationError message={errors?.customerLandmark?.message} />
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ gap: "24px" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <SelectField
                name={"customerProvince"}
                control={control}
                label={"Current Province"}
                options={LIST_OF_PROVINCES}
              />
              {errors?.customerProvince ? (
                <ValidationError message={errors?.customerProvince?.message} />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box>
              <SelectField
                name={"customerCity"}
                control={control}
                label={"Current City"}
                options={LIST_OF_CITIES}
              />
              {errors?.customerCity ? (
                <ValidationError message={errors?.customerCity?.message} />
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />

      {/* GOOGLE MAP DIALOG */}
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: "600px",
            },
          }}
        >
          <DialogTitle
            sx={{ color: "#5093e0", fontWeight: 700, textAlign: "center" }}
          >
            {"Confirm Your Location!"}
          </DialogTitle>
          <DialogContent sx={{ width: "100%", maxWidth: "600px" }}>
            {/* <img
              src={GOOGLE_MAP_IMG}
              className={styles.google_map_img}
              alt="GOOGLE_MAP_IMG"
            /> */}
            <LoadScript googleMapsApiKey={API_KEY}>
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            </LoadScript>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="outlined"
              sx={{ fontSize: "12px", height: "40px" }}
              autoFocus
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: "12px", height: "40px" }}
              onClick={handleProceedButton}
              autoFocus
            >
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

export default AddressDetail;
