import { Alert, Box, Button, Container, Skeleton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import CARD_UNDRAW from 'src/Assets/images/cardUndraw.svg';
import CustomButton from "src/Common/CustomButton";
import { showErrorModal } from "src/Redux/Reducers/ErrorState";
import { checkCameraPermission } from "src/Utils/Helpers";
import styles from './index.module.scss';

const CnicFrontForMobile = ({ errors, watch, setValue }) => {
    const dispatch = useDispatch();
    const [isCameraAccessAllowed, setisCameraAccessAllowed] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const CNIC_FRONT = watch("KEY_CNIC_FRONT");
    const webcamRef = useRef(null);
    const overlayRef = useRef(null);

    // Standard CNIC aspect ratio (85.6mm × 53.98mm)
    const CNIC_ASPECT_RATIO = 85.6 / 53.98;
    const CONTAINER_HEIGHT = '65vh';

    useEffect(() => {
        checkCameraPermission()
            .then(() => setisCameraAccessAllowed(true))
            .catch(() => {
                setisCameraAccessAllowed(false);
                dispatch(showErrorModal({
                    errorCode: "Camera Unavailable",
                    errorMessage: "Please enable camera permissions in your settings.",
                    isError: true,
                }));
            });
    }, [dispatch]);

    const capturePhoto = useCallback(async () => {
        if (!webcamRef.current || !overlayRef.current) return;

        setIsCapturing(true);
        try {
            const video = webcamRef.current.video;
            const overlay = overlayRef.current;

            // Get positions relative to viewport
            const videoRect = video.getBoundingClientRect();
            const overlayRect = overlay.getBoundingClientRect();

            // Calculate scaling factors
            const scaleX = video.videoWidth / videoRect.width;
            const scaleY = video.videoHeight / videoRect.height;

            // Create canvas with precise dimensions
            const canvas = document.createElement('canvas');
            canvas.width = overlayRect.width * scaleX;
            canvas.height = overlayRect.height * scaleY;
            const ctx = canvas.getContext('2d');

            // Draw only the overlay area (high resolution)
            ctx.drawImage(
                video,
                (overlayRect.left - videoRect.left) * scaleX,
                (overlayRect.top - videoRect.top) * scaleY,
                overlayRect.width * scaleX,
                overlayRect.height * scaleY,
                0,
                0,
                overlayRect.width * scaleX,
                overlayRect.height * scaleY
            );

            // Convert to JPEG with 85% quality
            const imageUrl = canvas.toDataURL('image/jpeg', 0.95);
            setValue("KEY_CNIC_FRONT", imageUrl);
        } catch (error) {
            console.error("Capture Error:", error);
            dispatch(showErrorModal({
                errorCode: "Capture Failed",
                errorMessage: "Could not capture image. Please try again.",
                isError: true
            }));
        } finally {
            setIsCapturing(false);
        }
    }, [dispatch, setValue]);

    const retake = () => setValue("KEY_CNIC_FRONT", null);

    return (
        <Box className={styles.container} sx={{ width: '100%' }}>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img src={CARD_UNDRAW} alt="cnic-front" className={styles.smallDeviceIconContainer} />
                <Box className={styles.heading} sx={{ mt: 1 }}>
                    {CNIC_FRONT ? 'CNIC Front Preview' : 'Capture CNIC Front'}
                </Box>
            </Box>

            {/* Camera/Preview Container */}
            <Container
                maxWidth="sm"
                sx={{ p: 0, mb: 2 }}
            >
                {isCameraAccessAllowed ? (
                    CNIC_FRONT ? (
                        // Preview Mode
                        <Box>
                            <img
                                src={CNIC_FRONT}
                                alt="CNIC Preview"
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    borderRadius: '5px'
                                }}
                            />
                            <Alert severity="info" sx={{
                                mt: 2,
                                backgroundColor: 'rgba(220, 238, 255, 0.7)',
                                borderColor: '#407ec9'
                            }}>
                                Please verify all details are clear and readable
                            </Alert>
                        </Box>
                    ) : (
                        // Capture Mode
                        <Box sx={{
                            position: 'relative', height: '380px', width: '100%', overflow: 'hidden', borderRadius: '7px'
                        }}>
                            <Webcam
                                ref={webcamRef}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    minWidth: '100%',
                                    minHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                }}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                    facingMode: "environment",
                                    aspectRatio: 16 / 9 // Adjust to match your camera's native aspect
                                }}
                                forceScreenshotSourceSize={true}
                            />
                            <Box className={styles.overlay}>
                                <Box
                                    ref={overlayRef}
                                    className={styles.imageContainer}
                                    sx={{
                                        border: '2px solid rgba(255,255,255,0.8)',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        boxSizing: 'border-box',
                                        aspectRatio: CNIC_ASPECT_RATIO,
                                        width: '85%'
                                    }}
                                />
                                <Box className={styles.prompt}>
                                    Position the front of your CNIC within the frame
                                </Box>
                            </Box>
                        </Box>
                    )
                ) : (
                    // Loading State
                    <Skeleton
                        variant="rounded"
                        width="100%"
                        height="380px"
                    />
                )}
            </Container>

            {/* BUTTONS */}
            <Box sx={{ textAlign: 'center', marginTop: "20px" }}>
                {!!CNIC_FRONT ? (
                    <Button
                        className={styles.captureButton}
                        type="button"
                        onClick={retake}
                        endIcon={<FaCamera />}
                    >
                        retake
                    </Button>
                ) : <Button
                    className={styles.captureButton}
                    type="button"
                    onClick={capturePhoto}
                    endIcon={<FaCamera />}
                >
                    Click here to capture
                </Button>}

                {(isCameraAccessAllowed && !!CNIC_FRONT) ? <CustomButton label={"Picture is clear, Proceed"} /> : null}

            </Box>
        </Box>
    );
};

export default CnicFrontForMobile;