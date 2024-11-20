import { Box, Button, Fade } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationButton from "src/Common/CustomButton";
import { useDispatch } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import styles from "./index.module.scss";
import Webcam from "react-webcam";
import {
  Contentstyles,
  Headingstyles,
  Iconstyles,
  Roundediconstyles,
} from "src/Utils/CommonStyles";
import CameraSvg from "src/Assets/svgs/camera.svg";
import { checkCameraPermission } from "src/Utils/Helpers";

const title = "Live Photo Capture";
const content = {
  description: "Kindly upload a clear live photo.",
};

const LivePhotoCapture = ({
  control,
  getValues,
  errors,
  setValue,
  watch,
  handleSubmit,
  submitFormData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedButton = (e) => {
    e.preventDefault();
    navigate("/customer-onboarding/upload-cnic");
  };

  const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
  const webcamRef = useRef(null);

  // To check whether the camera access permission is allowed or not
  useEffect(() => {
    checkCameraPermission()
      .then((permissionStatus) => {
        console.log(permissionStatus); // Camera permission granted
        setisCameraAccessAllowed(true);
      })
      .catch((errorMessage) => {
        console.error(errorMessage); // Camera permission denied or error: ...
        setisCameraAccessAllowed(false);
      });
  }, []);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setValue("LivePhoto", imageSrc);
  }, [webcamRef, setValue]);

  const retake = () => {
    setValue("LivePhoto", null);
  };

  const handleInitError = (error) => {
    console.error("Webcam initialization error:", error);
  };

  // Get the LivePhoto value directly from watch
  const livePhoto = watch("LivePhoto");

  return (
    <>
      {/* ICON */}
      <Box sx={Iconstyles}>
        <TbCameraPlus style={Roundediconstyles} />
      </Box>

      {/* MAIN HEADING */}
      <Fade in={true} timeout={800}>
        <Box sx={Headingstyles}>{title}</Box>
      </Fade>

      {/* CONTENT */}
      {content.description && (
        <Fade in={true} timeout={800}>
          <Box sx={Contentstyles}>{content?.description}</Box>
        </Fade>
      )}

      <Box className={styles.wrapperContainer}>
        {!isCameraAccessAllowed && (
          <>
            <Box className={styles.cameraWrapper}>
              <img
                className={styles.camIconStyle}
                src={CameraSvg}
                alt="Uploaded Selfie"
              />
            </Box>

            <Box className={styles.permissionText}>
              Allow camera permission to capture live photo
            </Box>
          </>
        )}

        {isCameraAccessAllowed && (
          <>
            {!!livePhoto ? (
              <img
                className={styles.uploadedSelfie}
                src={livePhoto}
                alt="Uploaded Selfie"
              />
            ) : (
              <Webcam
                ref={webcamRef}
                className={styles.webcamStyles}
                screenshotFormat="image/jpeg"
                onUserMediaError={handleInitError}
                videoConstraints={{ facingMode: "user" }}
                mirrored={true}
              />
            )}

            {!!errors?.LivePhoto?.message && !livePhoto ? (
              <ValidationError message={errors?.LivePhoto?.message} />
            ) : null}
          </>
        )}

        {/* BUTTONS CONTAINER */}
        <Box sx={{ marginTop: "50px" }}>
          {!!livePhoto ? (
            <Button
              className={styles.captureButton}
              type="button"
              onClick={retake}
            >
              Retake
            </Button>
          ) : (
            <Button
              className={styles.captureButton}
              onClick={capturePhoto}
              type="button"
            >
              Capture
            </Button>
          )}
        </Box>
      </Box>

      <VerificationButton onClick={handleProceedButton} label={"Proceed"} />
    </>
  );
};

export default LivePhotoCapture;
