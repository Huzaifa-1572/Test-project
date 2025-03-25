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
    const CNIC_FRONT = watch("KEY_CNIC_FRONT");
    const webcamRef = useRef(null);

    // Camera access permission check
    useEffect(() => {
        checkCameraPermission()
            .then((permissionStatus) => {
                console.log(permissionStatus); // Camera permission granted
                setisCameraAccessAllowed(true);
            })
            .catch((errorMessage) => {
                console.error(errorMessage); // Camera permission denied or error
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


    // CAMERA ACTIONS
    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        if (imageSrc) {
            setValue("KEY_CNIC_FRONT", imageSrc);
        }
    }, [webcamRef, setValue]);

    const retake = () => {
        setValue("KEY_CNIC_FRONT", null);
    };

    const handleInitError = (error) => {
        console.error("Webcam initialization error:", error);
    };

    return (
        <Box className={styles.container}>
            {/* HEADER */}
            <Box sx={{ textAlign: 'center' }}>
                <img src={CARD_UNDRAW} alt="cnic-front" className={styles.smallDeviceIconContainer} />
                <Box className={styles.heading}>
                    {CNIC_FRONT ? 'CNIC Front Image' : 'Capture CNIC Front Image '}
                </Box>
            </Box>


            <Container maxWidth={'sm'} className={styles.cameraContainer}>
                {isCameraAccessAllowed ? (
                    !!CNIC_FRONT ? (
                        <>
                            <Box sx={{ textAlign: 'center' }}>
                                <img
                                    className={styles.imageContainer}
                                    src={CNIC_FRONT}
                                    alt="Uploaded Selfie"
                                />
                            </Box>
                            <Alert sx={{ background: '#dceeff', color: '#407ec9', margin: '20px 0px' }} variant="outlined" severity="info">
                                Please make sure your card is close to the frame and all the text is clear
                            </Alert>
                        </>

                    ) :
                        (<>
                            <Webcam
                                ref={webcamRef}
                                className={styles.webcamStyles}
                                width="100%"
                                height="auto"
                                screenshotFormat="image/jpeg"
                                onUserMediaError={handleInitError}
                                videoConstraints={{ facingMode: "environment" }}
                            />

                            <Box className={styles.overlay}>
                                {/* IMAGE CONTAINER */}
                                <Box className={styles.imageContainer}></Box>

                                {/* PROMPT */}
                                <Box className={styles.prompt}>
                                    Position the front of your CNIC within the frame
                                </Box>
                            </Box>
                        </>)
                ) : (
                    <Skeleton variant="rounded" width='100%' height='420px' sx={{ color: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {!!CNIC_FRONT ? 'Loading...' : 'Searching for camera...'}
                    </Skeleton>
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

            <Box sx={{ textAlign: 'center' }}>
                {!!errors?.KEY_CNIC_FRONT?.message && !CNIC_FRONT ? (
                    <ValidationError message={errors?.KEY_CNIC_FRONT?.message} />
                ) : null}
            </Box>
        </Box >
    );
};

export default CnicFrontForMobile;