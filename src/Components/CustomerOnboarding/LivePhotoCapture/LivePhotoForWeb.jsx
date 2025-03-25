import { Box, Button, Container } from "@mui/material";
import * as faceDetection from "@tensorflow-models/face-detection";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import LIVE_IMAGE_ICON from 'src/Assets/images/liveImageIcon.png';
import LIVE_IMAGE_UNDRAW from 'src/Assets/images/liveImageUndraw.svg';
import SELFIE_UNDRAW from 'src/Assets/images/selfie.svg';
import CustomButton from "src/Common/CustomButton";
import Guidelines from "src/Common/Guidelines";
import { LIVE_IMAGE_GUIDELINES_FOR_WEB } from "src/Common/Guidelines/guideline";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { checkCameraPermission, getScreenData } from "src/Utils/Helpers";
import styles from "./index.module.scss";

const yawThreshold = 0.4;
const requiredYawFrames = 3;
const rollThresholdDegrees = 20;

const LivePhotoForWeb = ({ errors, setValue, watch }) => {
  const webcamRef = useRef(null);
  const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
  const { TITLE, DESCRIPTION } = getScreenData();
  const dispatch = useDispatch();
  const guidelinePoints = useMemo(() => LIVE_IMAGE_GUIDELINES_FOR_WEB, []);
  const [prompt, setPrompt] = useState("Detecting Face...");
  const [faceDetected, setFaceDetected] = useState(false);
  const currentPromptRef = useRef("Detecting Face...");
  const faceDetectedRef = useRef(false);
  const leftDoneRef = useRef(false);
  const rightDoneRef = useRef(false);
  const straightDoneRef = useRef(false);
  const frameCounterRef = useRef(0);

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
        );
      });
  }, [dispatch]);

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

  // FOR LIVENESS DETECTION
  const updatePrompt = (newPrompt) => {
    if (currentPromptRef.current === "Liveness Verified :white_check_mark:") return;
    setPrompt(newPrompt);
    currentPromptRef.current = newPrompt;
    frameCounterRef.current = 0;
  };

  const resetState = () => {
    if (currentPromptRef.current === "Liveness Verified :white_check_mark:") return;
    setFaceDetected(false);
    faceDetectedRef.current = false;
    updatePrompt("Detecting Face...");
    leftDoneRef.current = false;
    rightDoneRef.current = false;
    straightDoneRef.current = false;
    frameCounterRef.current = 0;
  };

  useEffect(() => {
    let detectionModel, landmarksModel, animationFrameId;
    const loadModels = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      detectionModel = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        { runtime: "tfjs" }
      );
      landmarksModel = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        { runtime: "tfjs" }
      );
      detectFaces();
    };
    const detectFaces = async () => {
      if (!webcamRef.current || !webcamRef.current.video) {
        animationFrameId = requestAnimationFrame(detectFaces);
        return;
      }
      const video = webcamRef.current.video;
      if (video.readyState === 4) {
        const canvas = document.createElement('canvas');
        canvas.width = 640; // Fixed width for detection
        canvas.height = 480; // Fixed height for detection
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const faces = await detectionModel.estimateFaces(canvas);
        if (faces.length > 0) {
          if (!faceDetectedRef.current) {
            faceDetectedRef.current = true;
            setFaceDetected(true);
            updatePrompt("Face Detected! Look Left");
          }
          const meshResults = await landmarksModel.estimateFaces(canvas);
          if (meshResults.length > 0) {
            processLandmarks(meshResults[0].keypoints);
          }
        } else if (faceDetectedRef.current && currentPromptRef.current !== "Liveness Verified :white_check_mark:") {
          resetState();
        }
      }
      animationFrameId = requestAnimationFrame(detectFaces);
    };
    const processLandmarks = (keypoints) => {
      const nose = keypoints[1];
      const leftEyeInner = keypoints[133];
      const rightEyeInner = keypoints[362];
      if (!(nose && leftEyeInner && rightEyeInner)) return;
      const eyeMidpointX = (leftEyeInner.x + rightEyeInner.x) / 2;
      const eyeDistance = Math.hypot(
        rightEyeInner.x - leftEyeInner.x,
        rightEyeInner.y - leftEyeInner.y
      );
      const normalizedYaw = (nose.x - eyeMidpointX) / eyeDistance;
      const deltaY = rightEyeInner.y - leftEyeInner.y;
      const deltaX = rightEyeInner.x - leftEyeInner.x;
      const rollRadians = Math.atan2(deltaY, deltaX);
      const rollDegrees = (rollRadians * 180) / Math.PI;
      handleHeadMovement(normalizedYaw, rollDegrees);
    };
    const handleHeadMovement = (normalizedYaw, rollDegrees) => {
      // Do not process further if liveness has been verified.
      if (currentPromptRef.current === "Liveness Verified :white_check_mark:") return;
      const promptText = currentPromptRef.current;
      // Check for head tilting.
      if (Math.abs(rollDegrees) > rollThresholdDegrees) {
        if (!promptText.includes("avoid tilting")) {
          updatePrompt("Please keep your head straight (avoid tilting).");
        }
        frameCounterRef.current = 0;
        return;
      }
      if (promptText.includes("avoid tilting") && Math.abs(rollDegrees) <= rollThresholdDegrees) {
        if (!leftDoneRef.current) {
          updatePrompt("Face Detected! Look Left");
        } else if (!rightDoneRef.current) {
          updatePrompt("Good! Now Look Right");
        } else if (!straightDoneRef.current) {
          updatePrompt("Perfect! Now Look Straight");
        }
        frameCounterRef.current = 0;
        return;
      }
      // Process yaw changes for the different directions.
      if (promptText === "Face Detected! Look Left" && normalizedYaw > yawThreshold) {
        frameCounterRef.current++;
        if (frameCounterRef.current >= requiredYawFrames) {
          leftDoneRef.current = true;
          updatePrompt("Good! Now Look Right");
        }
      } else if (promptText === "Good! Now Look Right" && normalizedYaw < -yawThreshold) {
        frameCounterRef.current++;
        if (frameCounterRef.current >= requiredYawFrames) {
          rightDoneRef.current = true;
          updatePrompt("Perfect! Now Look Straight");
        }
      } else if (
        promptText === "Perfect! Now Look Straight" &&
        Math.abs(normalizedYaw) < yawThreshold / 2
      ) {
        frameCounterRef.current++;
        if (frameCounterRef.current >= requiredYawFrames) {
          straightDoneRef.current = true;
          // updatePrompt("Liveness Verified :white_check_mark:");
          setTimeout(() => { capturePhoto() }, 3000)
        }
      } else {
        frameCounterRef.current = 0;
      }
    };
    loadModels();
    return () => {
      cancelAnimationFrame(animationFrameId);
      detectionModel?.dispose();
      landmarksModel?.dispose();
    };
  }, []);

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
              <>
                <Container maxWidth={'sm'} sx={{ padding: '0 !important', margin: '0', position: 'relative' }}>
                  <Webcam
                    ref={webcamRef}
                    className={styles.webcamStyles}
                    width="100%"
                    height="auto"
                    style={{ aspectRatio: '4/3' }}
                    screenshotFormat="image/jpeg"
                    onUserMediaError={handleInitError}
                    videoConstraints={{ facingMode: "user" }}
                    mirrored={true}
                  />
                  {/* Overlay Prompt */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {prompt}
                  </Box>
                </Container>
              </>
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
          ) : null
          }
        </Box>
      </Box>
      {isCameraAccessAllowed ? <CustomButton label={"Proceed"} /> : null}
    </WizardLayout>
  );
};
export default LivePhotoForWeb;