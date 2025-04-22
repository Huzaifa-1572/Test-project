import { Alert, Box, Button, Container } from "@mui/material";
import * as faceDetection from "@tensorflow-models/face-detection";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { LuScanFace } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import BLINK_DETECTION from 'src/Assets/images/blink-detect.gif';
import LIVE_IMAGE_ICON from 'src/Assets/images/liveImageIcon.png';
import LIVE_IMAGE_UNDRAW from 'src/Assets/images/liveImageUndraw.svg';
import LOOK_LEFT from 'src/Assets/images/look-left.gif';
import LOOK_RIGHT from 'src/Assets/images/look-right.gif';
import SCANNER from 'src/Assets/images/scan.png';
import SELFIE_UNDRAW from 'src/Assets/images/selfie.svg';
import SELFIE_UNDRAW_SM from 'src/Assets/images/selfie_sm.svg';
import GUIDELINE_UNDRAW from 'src/Assets/images/userFace.png';
import CustomButton from "src/Common/CustomButton";
import GuidelinesModal from "src/Common/Modals/GuidelinesModal";
import ValidationError from "src/Components/ValidationError";
import WizardLayout from "src/Layout/WizardLayout";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { LIVENESS_GUIDELINES } from "src/Utils/Constants";
import { checkCameraPermission, getScreenData, isSmallScreen } from "src/Utils/Helpers";
import styles from './index.module.scss';



const generatePrompt = (prompt, blinkCount) => {
    switch (prompt) {
        case 'Detecting Face...':
            return (
                <Alert className={styles.alert} variant="outlined" icon={<LuScanFace size='40px' color='#e8927c' />} severity="info">
                    Please wait while we detect your face. Keep your face aligned and close to the camera.
                </Alert>
            )

        case 'Face Detected! slowly blink your eyes.':
            return (
                <>
                    <Alert className={styles.alert} variant="outlined" icon={<img src={BLINK_DETECTION} height='65px' width='70px' />} severity="info">
                        <strong style={{ color: '#407ec9' }}>Blink slowly</strong>, hold your eyes closed for 1-2 seconds.
                        <br />
                        <strong style={{ color: '#407ec9' }}>Close Eye Detection Count: {blinkCount}</strong>
                        <br />
                        <p style={{ color: '#666666' }}>If wearing glasses, kindly remove them.</p>
                    </Alert>
                </>
            )

        case 'Look Left':
            return (
                <Alert className={styles.alert} variant="outlined" icon={<img src={LOOK_LEFT} height='60px' width='70px' />} severity="info">
                    <strong style={{ color: '#407ec9' }}> Perfect!</strong> Now slowly <strong style={{ color: '#407ec9' }}>turn your head left</strong > and hold your posture for 1-2 seconds.
                </Alert>
            )

        case 'Now Look Right':
            return (
                <Alert className={styles.alert} variant="outlined" icon={<img src={LOOK_RIGHT} height='60px' width='70px' />} severity="info">
                    <strong style={{ color: '#407ec9' }}>Great!</strong> Now slowly <strong style={{ color: '#407ec9' }}>turn your head right</strong> and hold your posture for 1-2 seconds.
                </Alert>
            )

        case 'Look Straight':
            return (
                <Alert className={styles.alert} variant="outlined" icon={<FaRegFaceSmileBeam size='40px' color='#e8927c' />} severity="info">
                    Now, look straight & don't close your eyes.
                </Alert>
            )

        default:
            break;
    }
}

// Detection parameters
const BLINK_HOLD_TIME = 15; // ms eyes must remain closed
const blinkThreshold = 0.15; // Adjusted for smaller devices
const requiredBlinkFrames = 2; // Require 2 consecutive frames for blink
const yawThreshold = 0.3; // Threshold for normalized head displacement for a full turn
const requiredYawFrames = 3; // Require 2 consecutive frames for head turn
const FRAME_SKIP = 5; // Process every 5th frame

const LivePhotoForMobile = ({ errors, setValue, watch }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // UI state
    const [prompt, setPrompt] = useState("Detecting Face...");
    const [faceDetected, setFaceDetected] = useState(false);
    const [blinkCount, setBlinkCount] = useState(0);
    const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
    const { TITLE, DESCRIPTION } = getScreenData();
    const dispatch = useDispatch();
    const livePhoto = watch("KEY_LIVE_PHOTO");
    const [showHelpModal, setshowHelpModal] = useState(false);
    const guidelines = useMemo(() => LIVENESS_GUIDELINES, [])

    // Refs for live values and flags
    const currentPromptRef = useRef("Detecting Face...");
    const faceDetectedRef = useRef(false);
    const lookingLeftRef = useRef(false);
    const lookingRightRef = useRef(false);
    const leftFrameCounter = useRef(0);
    const rightFrameCounter = useRef(0);
    const blinkCounterRef = useRef(0);
    const blinkState = useRef(false);
    const lastBlinkTime = useRef(0);
    const blinkFrameCounter = useRef(0);
    const blinkStageCompletedRef = useRef(false);
    const headMovementStageCompletedRef = useRef(false);
    const isRestartingRef = useRef(false);
    const frameCounter = useRef(0);

    const handleHelpModalClose = () => {
        setshowHelpModal(false);
    };

    // To check whether the camera access permission is allowed or not
    useEffect(() => {
        !livePhoto && setshowHelpModal(true);
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
        resetState();

    };

    const handleInitError = (error) => {
        console.error("Webcam initialization error:", error);
    };

    // LIVENESS DETECTION
    const updatePrompt = (newPrompt) => {
        setPrompt(newPrompt);
        currentPromptRef.current = newPrompt;
    };

    const resetState = () => {
        setFaceDetected(false);
        faceDetectedRef.current = false;
        updatePrompt("Detecting Face...");
        blinkCounterRef.current = 0;
        setBlinkCount(0);
        lookingLeftRef.current = false;
        lookingRightRef.current = false;
        blinkStageCompletedRef.current = false;
        headMovementStageCompletedRef.current = false;
        leftFrameCounter.current = 0;
        rightFrameCounter.current = 0;
        blinkFrameCounter.current = 0;
    };

    useEffect(() => {
        let detectionModel, landmarksModel;
        let animationFrameId;

        const loadModels = async () => {
            await tf.setBackend("webgl");
            detectionModel = await faceDetection.createDetector(
                faceDetection.SupportedModels.MediaPipeFaceDetector,
                { runtime: "tfjs", modelType: "short" }
            );
            landmarksModel = await faceLandmarksDetection.createDetector(
                faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                { runtime: "tfjs", refineLandmarks: false } // Use lite model
            );
            detectFaces(detectionModel, landmarksModel);
        };

        const detectFaces = async (detector, meshDetector) => {
            if (isRestartingRef.current) {
                animationFrameId = requestAnimationFrame(() =>
                    detectFaces(detector, meshDetector)
                );
                return;
            }
            if (!webcamRef.current || !webcamRef.current.video) {
                animationFrameId = requestAnimationFrame(() =>
                    detectFaces(detector, meshDetector)
                );
                return;
            }
            const video = webcamRef.current.video;
            if (video.readyState === 4) {
                try {
                    frameCounter.current++;
                    if (frameCounter.current % FRAME_SKIP !== 0) {
                        animationFrameId = requestAnimationFrame(() =>
                            detectFaces(detector, meshDetector)
                        );
                        return;
                    }

                    const faces = await detector.estimateFaces(video, { flipHorizontal: false });
                    if (faces.length > 0) {
                        isRestartingRef.current = false;
                        if (!faceDetectedRef.current) {
                            faceDetectedRef.current = true;
                            setFaceDetected(true);
                            updatePrompt("Face Detected! slowly blink your eyes.");
                            blinkStageCompletedRef.current = false;
                            headMovementStageCompletedRef.current = false;
                            leftFrameCounter.current = 0;
                            rightFrameCounter.current = 0;
                            blinkFrameCounter.current = 0;
                        }
                        const meshResults = await meshDetector.estimateFaces(video, { flipHorizontal: false });
                        if (meshResults.length > 0) {
                            processFaceLandmarks(meshResults[0].keypoints);
                        }
                    } else {
                        if (currentPromptRef.current !== "Detecting Face..." && !isRestartingRef.current) {
                            isRestartingRef.current = true;
                            updatePrompt("Restarting");
                            setTimeout(() => {
                                resetState();
                                isRestartingRef.current = false;
                            }, 3000);
                        } else {
                            resetState();
                        }
                    }
                } catch (error) {
                    console.error("Face detection error:", error);
                }
            }
            animationFrameId = requestAnimationFrame(() =>
                detectFaces(detector, meshDetector)
            );
        };

        const calculateEAR = (top, bottom, left, right) => {
            return Math.abs(top.y - bottom.y) / (Math.abs(left.x - right.x) + 0.0001);
        };

        const processFaceLandmarks = (keypoints) => {
            if (!keypoints || keypoints.length < 468) return;
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            const leftEyeTop = keypoints[159];
            const leftEyeBottom = keypoints[145];
            const leftEyeLeft = keypoints[33];
            const leftEyeRight = keypoints[133];

            const rightEyeTop = keypoints[386];
            const rightEyeBottom = keypoints[374];
            const rightEyeLeft = keypoints[362];
            const rightEyeRight = keypoints[263];

            const noseTip = keypoints[1];

            if (!leftEyeTop || !leftEyeBottom || !rightEyeTop || !rightEyeBottom || !noseTip) return;

            const leftEAR = calculateEAR(leftEyeTop, leftEyeBottom, leftEyeLeft, leftEyeRight);
            const rightEAR = calculateEAR(rightEyeTop, rightEyeBottom, rightEyeLeft, rightEyeRight);
            const avgEAR = (leftEAR + rightEAR) / 2;
            const currentTime = Date.now();

            if (avgEAR < blinkThreshold) {
                blinkFrameCounter.current++;
                if (!blinkState.current && blinkFrameCounter.current >= requiredBlinkFrames) {
                    blinkState.current = true;
                    lastBlinkTime.current = currentTime;
                }
            } else {
                if (blinkState.current && currentTime - lastBlinkTime.current > BLINK_HOLD_TIME) {
                    if (!blinkStageCompletedRef.current) {
                        blinkCounterRef.current += 1;
                        setBlinkCount(blinkCounterRef.current);
                    }
                    blinkState.current = false;
                    blinkFrameCounter.current = 0;
                } else {
                    blinkFrameCounter.current = 0;
                }
            }

            if (blinkCounterRef.current >= 2 && !blinkStageCompletedRef.current) {
                blinkStageCompletedRef.current = true;
                updatePrompt("Look Left");
            }

            if (blinkStageCompletedRef.current && !headMovementStageCompletedRef.current) {
                trackHeadRotation(keypoints);
            }
        };

        const trackHeadRotation = (keypoints) => {
            const leftEyeLeft = keypoints[33];
            const leftEyeRight = keypoints[133];
            const leftEyeCenter = {
                x: (leftEyeLeft.x + leftEyeRight.x) / 2,
                y: (leftEyeLeft.y + leftEyeRight.y) / 2,
            };

            const rightEyeLeft = keypoints[362];
            const rightEyeRight = keypoints[263];
            const rightEyeCenter = {
                x: (rightEyeLeft.x + rightEyeRight.x) / 2,
                y: (rightEyeLeft.y + rightEyeRight.y) / 2,
            };

            const eyeMidpoint = {
                x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
                y: (leftEyeCenter.y + rightEyeCenter.y) / 2,
            };

            const noseTip = keypoints[1];

            const eyeDistance = Math.abs(rightEyeCenter.x - leftEyeCenter.x);
            if (eyeDistance < 0.0001) return;
            const displacement = noseTip.x - eyeMidpoint.x;
            const normalizedDisplacement = displacement / eyeDistance;

            if (currentPromptRef.current === "Look Left") {
                if (normalizedDisplacement > yawThreshold) {
                    leftFrameCounter.current++;
                } else {
                    leftFrameCounter.current = 0;
                }
                if (leftFrameCounter.current >= requiredYawFrames && !lookingLeftRef.current) {
                    lookingLeftRef.current = true;
                    updatePrompt("Now Look Right");
                    rightFrameCounter.current = 0;
                }
            } else if (currentPromptRef.current === "Now Look Right" && lookingLeftRef.current) {
                if (normalizedDisplacement < -yawThreshold) {
                    rightFrameCounter.current++;
                } else {
                    rightFrameCounter.current = 0;
                }
                if (rightFrameCounter.current >= requiredYawFrames && !lookingRightRef.current) {
                    lookingRightRef.current = true;
                    updatePrompt("Look Straight");
                    headMovementStageCompletedRef.current = true;
                    setTimeout(() => { capturePhoto() }, 3000)
                }
            }
        };

        loadModels();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (detectionModel) detectionModel.dispose();
            if (landmarksModel) landmarksModel.dispose();
        };
    }, []);

    const handleHelp = () => {
        setshowHelpModal(true)
    }

    return (
        <>
            <WizardLayout
                Icon={LIVE_IMAGE_ICON}
                title={'Hey! its time for a selfie'}
                description={'Please capture your live photo now to proceed with the verification process.'}
                heroImage={LIVE_IMAGE_UNDRAW}
            >
                <Box>
                    {!isCameraAccessAllowed && (
                        <>
                            <Box className={styles.cameraWrapper}>
                                <img
                                    className={styles.camIconStyle}
                                    src={isSmallScreen() ? SELFIE_UNDRAW_SM : SELFIE_UNDRAW}
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
                                <>
                                    <Alert sx={{ background: '#dceeff', color: '#407ec9', margin: '20px 0px' }} variant="outlined" icon={<LuScanFace size='40px' />} severity="info">
                                        <strong>Selfie captured successfully!</strong> You can now proceed.
                                    </Alert>
                                    <img
                                        className={styles.webcamStyles}
                                        src={livePhoto}
                                        alt="Uploaded Selfie"
                                    />
                                </>

                            ) : (
                                <>
                                    <Box sx={{ justifyContent: 'flex-end', marginBottom: '10px', textDecoration: 'underline', color: '#e8927c', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ cursor: 'pointer' }} onClick={handleHelp}>
                                            Get Help
                                        </span>
                                    </Box>

                                    {generatePrompt(prompt, blinkCount)}

                                    <Container maxWidth='lg'>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: "relative" }}>
                                            {/* WEBCAM CONTAINER */}
                                            <Box sx={{ position: 'relative' }}>

                                                <Webcam
                                                    ref={webcamRef}
                                                    width={320}
                                                    height={280}
                                                    screenshotFormat="image/jpeg"
                                                    mirrored={true}
                                                    onUserMediaError={handleInitError}
                                                    videoConstraints={{
                                                        facingMode: "user",
                                                        width: 320,
                                                        height: 280,
                                                    }}
                                                />

                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: '50%',
                                                        transform: 'translate(-50%, -0%)',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                        background: 'rgba(220, 239, 255, 0.8)',
                                                        color: '#407ec9',
                                                        padding: '5px 5px',
                                                        width: '100%'
                                                    }}
                                                >
                                                    {prompt}
                                                </Box>

                                                <div className={styles.scannerImageContainer}>
                                                    <img src={SCANNER} alt="Scanner" height="100%" width="100%" />
                                                </div>

                                                <canvas
                                                    ref={canvasRef}
                                                    width={320}
                                                    height={280}
                                                    style={{ borderRadius: '12px', position: "absolute", top: 0, left: 0, zIndex: 1 }}
                                                />

                                            </Box>
                                        </Box>
                                    </Container>

                                    <Alert severity="warning" sx={{ marginTop: '15px', color: '#3b3b3b', fontSize: '12px' }} >
                                        Hold your postures longer if using an older /slower device.
                                    </Alert>
                                </>
                            )}
                            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                {!!errors?.KEY_LIVE_PHOTO?.message && !livePhoto ? (
                                    <ValidationError message={errors?.KEY_LIVE_PHOTO?.message} />
                                ) : null}
                            </Box>
                        </>
                    )}
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: "20px" }}>
                        {!!livePhoto ? (
                            <Button
                                className={styles.captureButton}
                                type="button"
                                onClick={retake}
                                endIcon={<FaCamera />}
                            >
                                Take a new picture
                            </Button>
                        ) : null}
                    </Box>
                </Box>
                {(isCameraAccessAllowed && !!livePhoto) ? <CustomButton label={"Picture is clear, Proceed"} /> : null}
            </WizardLayout >

            <GuidelinesModal
                showHelp={showHelpModal}
                handleClose={handleHelpModalClose}
                icon={GUIDELINE_UNDRAW}
                title={'Face Detection Guidelines'}
                guidelines={guidelines}
            />
        </>
    );
};

export default LivePhotoForMobile;