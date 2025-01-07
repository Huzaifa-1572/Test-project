import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./index.module.scss";
import LIVE_IMAGE_ICON from 'src/Assets/images/liveImageIcon.png';
import LIVE_IMAGE_UNDRAW from 'src/Assets/images/liveImageUndraw.svg';
import SELFIE_UNDRAW from 'src/Assets/images/selfie.svg';
import CustomButton from "src/Common/CustomButton";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { checkCameraPermission, getScreenData } from "src/Utils/Helpers";


const LivePhotoCapture = ({ errors, setValue, watch }) => {
  const webcamRef = useRef(null);
  const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
  const { TITLE, DESCRIPTION } = getScreenData()

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

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setValue("KEY_LIVE_PHOTO", imageSrc);
    }
  }, [webcamRef, setValue]);

  const retake = () => {
    setValue("KEY_LIVE_PHOTO", null);
  };

  const handleInitError = (error) => {
    console.error("Webcam initialization error:", error);
  };

  const livePhoto = watch("KEY_LIVE_PHOTO");

  return (
    <WizardLayout
      Icon={LIVE_IMAGE_ICON}
      title={TITLE}
      description={'Please capture your live photo now to proceed with the verification process. Ensure that your face is clearly visible and the lighting is adequate for the best results.'}
      heroImage={LIVE_IMAGE_UNDRAW}
    >

      <Box>
        {!isCameraAccessAllowed && (
          <>
            <Box className={styles.cameraWrapper}>
              <img
                className={styles.camIconStyle}
                src={SELFIE_UNDRAW}
                alt="Upload Selfie"
              />
              <Box className={styles.permissionText}>
                Allow camera permission to capture live photo
              </Box>
            </Box>


          </>
        )}

        {isCameraAccessAllowed && (
          <>
            {!!livePhoto ? (
              <img
                className={styles.webcamStyles}
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
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              {!!errors?.KEY_LIVE_PHOTO?.message && !livePhoto ? (
                <ValidationError message={errors?.KEY_LIVE_PHOTO?.message} />
              ) : null}
            </Box>
          </>
        )}

        {/* BUTTONS CONTAINER */}
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: "20px" }}>
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
              Capture Selfie
            </Button>
          )}
        </Box>
      </Box>
      <CustomButton label={"Proceed"} />
    </WizardLayout>
  );
};

export default LivePhotoCapture;
