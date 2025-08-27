import { Alert, Box, Button, Container, Fade, Slide, Switch } from "@mui/material";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { LuScanFace } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import detectingFace from 'src/Assets/detectingFace.mp3';
import detectingFaceUrdu from 'src/Assets/detectingFaceUrdu.mp3';
import eyeBlink from 'src/Assets/eyeBlink.mp3';
import eyeBlinkUrdu from 'src/Assets/eyeBlinkUrdu.mp3';
import BLINK_DETECTION from 'src/Assets/images/blink-detect.gif';
import LIVE_IMAGE_UNDRAW from 'src/Assets/Icons/selfieIcon.png';
import LOOK_LEFT from 'src/Assets/images/look-left.gif';
import LOOK_RIGHT from 'src/Assets/images/look-right.gif';
import SCANNER from 'src/Assets/images/scan.png';
import SELFIE_UNDRAW from 'src/Assets/images/selfie.svg';
import lookLeft from 'src/Assets/lookLeft.mp3';
import lookLeftUrdu from 'src/Assets/lookLeftUrdu.mp3';
import lookRight from 'src/Assets/lookRight.mp3';
import lookRightUrdu from 'src/Assets/lookRightUrdu.mp3';
import lookStraight from 'src/Assets/lookStraight.mp3';
import lookStraightUrdu from 'src/Assets/lookStraightUrdu.mp3';
import MODEL_LOADER from 'src/Assets/modelLoader.gif';
import CustomButton from "src/Common/CustomButton";
import ValidationError from "src/Components/ValidationError";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { checkCameraPermission, getModels } from "src/Utils/Helpers";
import useSound from "use-sound";
import styles from './index.module.scss';
import LivePhotoGuidelinesForMobile from "./LivePhotoGuidelinesForMobile";

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
            return (
                <Alert className={styles.alert} variant="outlined" icon={<LuScanFace size='40px' color='#e8927c' />} severity="info">
                    Please wait while we detect your face. Keep your face aligned and close to the camera.
                </Alert>
            )
    }
}

const generatePromptMessages = (prompt) => {
    switch (prompt) {
        case "Restarting":
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Restarting <img src={MODEL_LOADER} style={{ marginLeft: '5px', marginTop: '5px' }} height={'20px'} width={'20px'} alt="..." />
                </Box>
            )
        case 'Detecting Face...':
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Detecting Face <img src={MODEL_LOADER} style={{ marginLeft: '5px', marginTop: '5px' }} height={'20px'} width={'20px'} alt="..." />
                </Box>
            )
        case 'Face Detected! slowly blink your eyes.':
            return (
                <Slide direction="right" in={true} timeout={500}>
                    <Box>Face Detected! slowly blink your eyes.</Box>
                </Slide>
            )
        case 'Look Left':
            return (
                <Slide direction="up" in={true} timeout={1000}>
                    <Box>Look Left</Box>
                </Slide>
            )
        case 'Now Look Right':
            return (
                <Box>Now Look Right</Box>
            )
        case 'Look Straight':
            return (
                <Box>Look Straight</Box>
            )
        default:
            break
    }
}

// Detection parameters
const BLINK_HOLD_TIME = 15; // ms eyes must remain closed
const blinkThreshold = 0.15; // Adjusted for smaller devices
const requiredBlinkFrames = 2; // Require 2 consecutive frames for blink
const yawThreshold = 0.3; // Threshold for normalized head displacement for a full turn
const requiredYawFrames = 3; // Require 2 consecutive frames for head turn
const FRAME_SKIP = 10; // Process every 10th frame for better performance
const MAX_RETRIES = 3; // Maximum number of restart attempts

const LivePhotoForMobile = ({ errors, setValue, watch }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [audioLang, setAudioLang] = useState('en');
    // Sound hooks (English/Urdu)
    const [playDetectingFace, { stop: stopDetectingFace }] = useSound(audioLang === 'en' ? detectingFace : detectingFaceUrdu, { volume: 0.7 });
    const [playEyeBlink, { stop: stopEyeBlink }] = useSound(audioLang === 'en' ? eyeBlink : eyeBlinkUrdu, { volume: 0.7 });
    const [playLookLeft, { stop: stopLookLeft }] = useSound(audioLang === 'en' ? lookLeft : lookLeftUrdu, { volume: 0.7 });
    const [playLookRight, { stop: stopLookRight }] = useSound(audioLang === 'en' ? lookRight : lookRightUrdu, { volume: 0.7 });
    const [playLookStraight, { stop: stopLookStraight }] = useSound(audioLang === 'en' ? lookStraight : lookStraightUrdu, { volume: 0.7 });
    // UI state
    const [prompt, setPrompt] = useState("Detecting Face...");
    const [faceDetected, setFaceDetected] = useState(false);
    const [blinkCount, setBlinkCount] = useState(0);
    const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
    const dispatch = useDispatch();
    const livePhoto = watch("KEY_LIVE_PHOTO");
    const [showGuidelines, setshowGuidelines] = useState(true);

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
    const timeoutRef = useRef(null);
    const retryCountRef = useRef(0);

    // To check whether the camera access permission is allowed or not
    useEffect(() => {
        !!livePhoto && setshowGuidelines(false);
        checkCameraPermission()
            .then(() => {
                console.log("Camera permission granted");
                setisCameraAccessAllowed(true);
            })
            .catch((errorMessage) => {
                console.error(errorMessage);
                setisCameraAccessAllowed(false);
                dispatch(
                    showErrorModal({
                        errorCode: "Camera Unavailable",
                        errorMessage: "Unable to access the camera. Please ensure your device's camera is functional and permissions are enabled in your settings.",
                        isError: true,
                    })
                );
            });
    }, [dispatch, livePhoto]);

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
        dispatch(
            showErrorModal({
                errorCode: "Webcam Error",
                errorMessage: "Failed to initialize webcam. Please ensure your camera is enabled and try again.",
                isError: true,
            })
        );
        // Retry camera permission check
        setTimeout(() => {
            checkCameraPermission()
                .then(() => setisCameraAccessAllowed(true))
                .catch(() => setisCameraAccessAllowed(false));
        }, 2000);
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
        retryCountRef.current = 0;
    };

    useEffect(() => {
        let detectionModel, landmarksModel;
        let animationFrameId;

        const detectFaces = async (detector, meshDetector) => {
            if (!detector || !meshDetector) {
                console.error("Models not loaded!");
                return;
            }
            if (isRestartingRef.current) {
                animationFrameId = requestAnimationFrame(() =>
                    detectFaces(detector, meshDetector)
                );
                return;
            }
            if (!webcamRef.current || !webcamRef.current.video) {
                console.log("Webcam not available");
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
                    const faces = await detector.estimateFaces(video, {
                        flipHorizontal: false,
                        inputSize: 128, // Reduced resolution for performance
                    });

                    if (faces.length > 0) {
                        isRestartingRef.current = false;
                        retryCountRef.current = 0;
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
                        const meshResults = await meshDetector.estimateFaces(video, {
                            flipHorizontal: false,
                            inputSize: 128,
                        });
                        if (meshResults.length > 0) {
                            processFaceLandmarks(meshResults[0].keypoints);
                        }
                    } else {
                        if (currentPromptRef.current !== "Detecting Face..." && !isRestartingRef.current) {
                            if (retryCountRef.current >= MAX_RETRIES) {
                                dispatch(
                                    showErrorModal({
                                        errorCode: "Face Detection Failure",
                                        errorMessage: "Unable to detect face after multiple attempts. Please ensure proper lighting and try again.",
                                        isError: true,
                                    })
                                );
                                return;
                            }
                            isRestartingRef.current = true;
                            updatePrompt("Restarting");
                            if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                                timeoutRef.current = null;
                            }
                            setTimeout(() => {
                                resetState();
                                isRestartingRef.current = false;
                                retryCountRef.current++;
                            }, 3000);
                        } else {
                            resetState();
                        }
                    }
                } catch (error) {
                    console.error("Face detection error:", error);
                }
            } else {
                console.log("Video not ready, retrying...");
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

                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = setTimeout(() => {
                        capturePhoto();
                    }, 3500);
                }
            }
        };

        // Try WebGL backend, fallback to CPU if it fails
        tf.setBackend('webgl')
            .then(() => {
                console.log('Using WebGL backend');
                getModels()
                    .then(([detector, meshDetector]) => {
                        console.log('Models loaded successfully');
                        detectFaces(detector, meshDetector);
                    })
                    .catch(err => {
                        console.error('Failed to load models:', err);
                        dispatch(
                            showErrorModal({
                                errorCode: "Model Loading Error",
                                errorMessage: "Failed to load face detection models. Please try again later.",
                                isError: true,
                            })
                        );
                    });
            })
            .catch(err => {
                console.error('WebGL backend failed, falling back to CPU:', err);
                tf.setBackend('cpu').then(() => {
                    console.log('Using CPU backend');
                    getModels()
                        .then(([detector, meshDetector]) => {
                            console.log('Models loaded successfully');
                            detectFaces(detector, meshDetector);
                        })
                        .catch(err => {
                            console.error('Failed to load models:', err);
                            dispatch(
                                showErrorModal({
                                    errorCode: "Model Loading Error",
                                    errorMessage: "Failed to load face detection models. Please try again later.",
                                    isError: true,
                                })
                            );
                        });
                });
            });

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (detectionModel) detectionModel.dispose();
            if (landmarksModel) landmarksModel.dispose();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [capturePhoto]);

    // FOR PROMPT SOUND
    useEffect(() => {
        stopDetectingFace();
        stopEyeBlink();
        stopLookLeft();
        stopLookRight();
        stopLookStraight();
        switch (prompt) {
            case 'Detecting Face...':
                playDetectingFace();
                break;
            case 'Face Detected! slowly blink your eyes.':
                playEyeBlink();
                break;
            case 'Look Left':
                playLookLeft();
                break;
            case 'Now Look Right':
                playLookRight();
                break;
            case 'Look Straight':
                playLookStraight();
                break;
            default:
                break;
        }
        return () => {
            stopDetectingFace();
            stopEyeBlink();
            stopLookLeft();
            stopLookRight();
            stopLookStraight();
        };
    }, [prompt, playDetectingFace, playEyeBlink, playLookLeft, playLookRight, playLookStraight, stopDetectingFace, stopEyeBlink, stopLookLeft, stopLookRight, stopLookStraight]);

    // SPLASH SCREEN HANDLERS
    const handleSplashScreenClose = () => {
        setshowGuidelines(false);
    }

    const handleSplashScreenOpen = () => {
        setshowGuidelines(true);
    }

    return (
        <>
            {
                showGuidelines ?
                    <LivePhotoGuidelinesForMobile
                        closeSplashScreenHandler={handleSplashScreenClose}
                        language={audioLang}
                        onAudioLangChange={setAudioLang}
                    />
                    :
                    <Container maxWidth="lg" sx={{ padding: '4px' }}>
                        {/* SWITCH & NEED HELP */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', marginBottom: '35px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: '-25px' }}>
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: audioLang === 'en' ? 'bold' : 'normal',
                                    color: audioLang === 'en' ? '#407ec9' : 'inherit',
                                    textDecoration: audioLang === 'en' ? 'underline' : 'none'
                                }}>English🔊</span>
                                <Switch
                                    checked={audioLang === 'ur'}
                                    onChange={e => setAudioLang(e.target.checked ? 'ur' : 'en')}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'audio language toggle' }}
                                    sx={{
                                        margin: 0,
                                        '& .MuiSwitch-track': {
                                            backgroundColor: '#407ec9',
                                        },
                                        '& .Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#407ec9',
                                        }
                                    }}
                                />
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: audioLang === 'ur' ? 'bold' : 'normal',
                                    color: audioLang === 'ur' ? '#407ec9' : 'inherit',
                                    textDecoration: audioLang === 'ur' ? 'underline' : 'none'
                                }}>🔊Urdu</span>
                            </Box>
                            <Box sx={{ textDecoration: 'underline', color: '#0d1821', display: 'flex', alignItems: 'center', marginTop: '-25px', marginBottom: '5px' }}>
                                <span style={{ cursor: 'pointer' }} onClick={handleSplashScreenOpen}>
                                    Need Help?
                                </span>
                            </Box>
                        </Box>

                        <Box sx={{ marginBottom: '10px', marginTop: '-10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Fade in={true} timeout={2000}>
                                <Box sx={{ height: '60px' }} >
                                    <img style={{ display: 'inline-block' }} src={LIVE_IMAGE_UNDRAW} />
                                </Box>
                            </Fade>
                        </Box>

                        <Box>
                            {
                                !!livePhoto ? null :
                                    <Fade in={true} timeout={2000}>
                                        <Box sx={{ paddingTop: '-35px', paddingBottom: '7px', textAlign: 'center', fontSize: 'clamp(20px, 3vw, 35px)', letterSpacing: '0.5px', fontWeight: 700 }}>
                                            Hey! Its Time For A Selfie
                                        </Box>
                                    </Fade>
                            }

                            {!isCameraAccessAllowed && (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                </Box>
                            )}
                            {isCameraAccessAllowed && (
                                <>
                                    {!!livePhoto ? (
                                        <>
                                            <Alert sx={{ display: 'flex', alignItems: 'center', background: '#dceeff', color: '#407ec9', margin: '20px 0px' }} variant="outlined" icon={<LuScanFace size='40px' />} severity="info">
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
                                            <Container maxWidth='lg'>
                                                {generatePrompt(prompt, blinkCount)}

                                                <Box sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', color: '#407ec9', padding: '5px 0px' }}>
                                                    {generatePromptMessages(prompt)}
                                                </Box>

                                                {/* WEBCAM CONTAINER */}
                                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: "relative" }}>
                                                    <Box sx={{ position: 'relative' }}>
                                                        <Webcam
                                                            ref={webcamRef}
                                                            width={320}
                                                            height={280}
                                                            screenshotFormat="image/jpeg"
                                                            mirrored={true}
                                                            style={{ borderRadius: '10px' }}
                                                            onUserMediaError={handleInitError}
                                                            videoConstraints={{
                                                                facingMode: "user",
                                                                width: { ideal: 320 },
                                                                height: { ideal: 280 },
                                                            }}
                                                            playsInline={true}
                                                            muted={true}
                                                            autoPlay={true}
                                                        />

                                                        <div className={styles.scannerImageContainer}>
                                                            <img src={SCANNER} alt="Scanner" height="100%" width="100%" />
                                                        </div>

                                                        <canvas
                                                            ref={canvasRef}
                                                            width={320}
                                                            height={280}
                                                            style={{ borderRadius: '12px', border: '3px solid #f4f4f4', position: "absolute", top: 0, left: 0, zIndex: 1 }}
                                                        />
                                                    </Box>
                                                </Box>


                                            </Container>

                                            <Box sx={{ textAlign: 'center', marginTop: '15px', color: '#3b3b3b', fontSize: '12px' }}>
                                                🔊 Keep your volume on to follow the audio instructions.
                                            </Box>

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
                                        sx={{ borderRadius: '999px' }}
                                    >
                                        Take a new picture
                                    </Button>
                                ) : null}
                            </Box>
                        </Box>
                        {(isCameraAccessAllowed && !!livePhoto) ? <CustomButton label={"Picture is clear, Proceed"} /> : null}
                    </Container >
            }
        </>
    );
};

export default LivePhotoForMobile;