import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import LIVE_IMAGE_ICON from 'src/Assets/images/liveImageIcon.png';
import LIVE_IMAGE_UNDRAW from 'src/Assets/images/liveImageUndraw.svg';
import SELFIE_UNDRAW from 'src/Assets/images/selfie.svg';
import CustomButton from "src/Common/CustomButton";
import Guidelines from "src/Common/Guidelines";
import { LIVE_IMAGE_GUIDELINES } from "src/Common/Guidelines/guideline";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { checkCameraPermission, getScreenData } from "src/Utils/Helpers";
import styles from "./index.module.scss";


const LivePhotoCapture = ({ errors, setValue, watch }) => {
  const webcamRef = useRef(null);
  const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
  const { TITLE, DESCRIPTION } = getScreenData()
  const dispatch = useDispatch()
  const guidelinePoints = useMemo(() => LIVE_IMAGE_GUIDELINES, [])

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
        dispatch(
          showErrorModal({
            errorCode: "Camera Unavailable",
            errorMessage: "Unable to access the camera. Please ensure your device's camera is functional and permissions are enabled in your settings.",
            isError: true,
          })
        )
      });
  }, []);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();
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
      description={'Please capture your live photo now to proceed with the verification process.'}
      heroImage={LIVE_IMAGE_UNDRAW}
    >
      <Guidelines guidelinePoints={guidelinePoints} />

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
                Searching camera...
                <br />Allow camera permission to capture live photo.
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
              disabled={!isCameraAccessAllowed}
            >
              Capture Selfie
            </Button>
          )}
        </Box>
      </Box>
      {isCameraAccessAllowed ? <CustomButton label={"Proceed"} /> : null}
    </WizardLayout>
  );
};

export default LivePhotoCapture;
