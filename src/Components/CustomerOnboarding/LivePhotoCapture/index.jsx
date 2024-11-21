import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./index.module.scss";
import Webcam from "react-webcam";
import CameraSvg from "src/Assets/svgs/camera.svg";
import { checkCameraPermission, getScreenData } from "src/Utils/Helpers";
import CustomButton from "src/Common/CustomButton";
import WizardLayout from "src/Layout/WizardLayout";

const LivePhotoCapture = ({
  errors,
  setValue,
  watch,
}) => {
  const webcamRef = useRef(null);
  const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
  const { TITLE, DESCRIPTION, FIELDS } = getScreenData()

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
    <WizardLayout
      icon={"TbCameraPlus"}
      title={TITLE}
      description={DESCRIPTION}
    >

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

      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default LivePhotoCapture;
