import { Alert, Box, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeviceDecisionModal from 'src/Common/Modals/DeviceDecisionModal';
import usePostDataToServer from 'src/Hooks/usePostdataToServer';
import { updateCurrentScreen } from 'src/Redux/Reducers/CurrentScreenState';
import { updatePrevScreen } from 'src/Redux/Reducers/PrevScreenState';
import { CUSTEMAIL_HANDLER, CUSTMOBILE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission';
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess';
import CustomButton from '../CustomButton';
import styles from './index.module.scss';


function VerificationPage({ icon, title, content, description, goBackContent, setValue, getValues }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [resendOTP, setResendOTP] = useState(59);
    const IS_RESUME_FLOW = localStorage.getItem('isResume') || false;
    const PREVIOUS_SCREEN = useSelector(state => state?.prevScreenState)
    const { title: modalTitle, description: modalDescription, isDeviceDecisionModal } = useSelector(state => state.deviceDecisionModal)
    const isResume = localStorage.getItem('isResume')
    const isWebview = JSON.parse(sessionStorage.getItem('device')).deviceId !== 'temp'
    const isIosDevice = JSON.parse(sessionStorage.getItem('device')).deviceType === 'ios'




    const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

    useEffect(() => {
        window.handleDataFromApp = (data) => {
            setOtp((data?.otp).toString() || '');
            setValue('CUSTOMER_OTP', data?.otp)
        }


        if (resendOTP > 0) {
            const interval = setInterval(() => {
                setResendOTP((prevTimer) => Math.max(0, prevTimer - 1));
            }, 1000);

            return () => clearInterval(interval);
        }

        // If countdown reaches 0, reset to 60
        if (resendOTP === 1) {
            setResendOTP(60);
        }
    }, [resendOTP]);

    const handleOtpChange = (otpValue) => {
        console.log(typeof otpValue)
        setOtp(otpValue);
        setValue('CUSTOMER_OTP', otpValue)
    };

    // Function to format the countdown string
    const formatCountdownString = () => {
        return `Resend in ${String(Math.floor(resendOTP / 60)).padStart(2, '0')}:${String(
            resendOTP % 60
        ).padStart(2, '0')}`;
    };

    const handleResendClick = () => {
        setOtp('')
        const data = getValues()

        if (PREVIOUS_SCREEN === 'scr_customerMobile') {
            const { BODY, API_URL } = CUSTMOBILE_HANDLER({ CURRENT_SCREEN: PREVIOUS_SCREEN, data, isResumeApplication: IS_RESUME_FLOW })
            mutate({ BODY, API_URL, dispatch })
        }

        if (PREVIOUS_SCREEN === 'scr_customerEmail') {
            const { BODY, API_URL } = CUSTEMAIL_HANDLER({ CURRENT_SCREEN: PREVIOUS_SCREEN, data })
            mutate({ BODY, API_URL, dispatch })
        }

        // Reset the timer to 60 seconds
        if (resendOTP === 0) {
            setResendOTP(60);
        }
    };

    function onSuccessfullFormDataSubmission(response) {
        postRequestSuccess({ response, dispatch, navigate, setValue })
    }

    const handleGoBack = () => {
        if (PREVIOUS_SCREEN === 'scr_customerMobile') {
            const EXPILICIT_PREV_SCREEN = 'scr_customerCnic'
            dispatch(updateCurrentScreen(PREVIOUS_SCREEN));
            dispatch(updatePrevScreen(EXPILICIT_PREV_SCREEN));
        }

        if (PREVIOUS_SCREEN === 'scr_customerEmail') {
            const EXPILICIT_PREV_SCREEN = 'scr_hasValidEmail'
            dispatch(updatePrevScreen(EXPILICIT_PREV_SCREEN));
            dispatch(updateCurrentScreen(PREVIOUS_SCREEN));
        }
    }

    return (
        <Container maxWidth="lg" className={styles.paperContainer} sx={{ background: { xs: 'none', md: '#f6f6f6' }, borderRadius: { xs: '7px', sm: '20px' } }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Box>
                    <img src={icon} alt="mobileOtpLogo" height={'100px'} width={'140px'} />
                </Box>
                <h2 className={styles.mainHeading}>{title}</h2>
                <p className={styles.content}>
                    {content}
                </p>
                <Box sx={{ fontSize: 'clamp(10px,3vw,14px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ marginRight: '20px' }}>{description}</Box>
                    {/* IF WE ARE NOT IN RESUME MODE THEN ONLY SHOW CHANGE OPTION */}
                    {
                        (goBackContent && !isResume) ?
                            <Box className={styles.goBack} sx={{ margin: { xs: '12px 0px', sm: 0 } }}>
                                <span onClick={handleGoBack}>{goBackContent}</span>
                            </Box> : null
                    }
                </Box>

                <div className={styles.resendOTP} >
                    {resendOTP === 0 ? (
                        <Button type='button' variant='outlined' className={styles.countdownStyle} onClick={handleResendClick}>
                            Resend OTP
                        </Button>
                    ) : (
                        formatCountdownString()
                    )}
                </div>

                <div className={styles.OptContainer}>
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={6}
                        isInputNum={true}
                        secret
                        renderSeparator={<span></span>}
                        renderInput={(props) => (
                            <input
                                {...props}
                                // disabled={isIosDevice ? false : (PREVIOUS_SCREEN === 'scr_customerMobile' && (isMobile || isWebview)) ? true : false}
                                disabled={false}
                                autoComplete="one-time-code"
                                style={{
                                    WebkitTextSecurity: "disc",
                                    MozTextSecurity: "disc",
                                    textSecurity: "disc",
                                    // cursor: (isIosDevice ? 'pointer' : PREVIOUS_SCREEN === 'scr_customerMobile' && (isMobile || isWebview)) && 'not-allowed'
                                }}
                            />
                        )}
                        inputStyle={styles.inputStyle}
                        // shouldAutoFocus={(PREVIOUS_SCREEN === 'scr_customerMobile' && (isMobile || isWebview)) ? false : true}
                        shouldAutoFocus={true}

                    />

                    {
                        // isIosDevice ? null : (PREVIOUS_SCREEN === 'scr_customerMobile' && (isMobile || isWebview)) &&
                        //     <Alert sx={{ borderRadius: '7px', }} severity='warning'>
                        //         {/* <Box sx={{ fontSize: '13px', fontWeight: 'bold' }}>Manual OTP entry is not allowed.</Box> */}
                        //         <Box sx={{ fontSize: '11px' }}>Please wait for the OTP to be auto-filled.</Box>
                        //     </Alert>
                    }
                </div>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                <CustomButton label='Verify' />
            </Box>

            {
                !!isDeviceDecisionModal ?
                    <DeviceDecisionModal
                        title={modalTitle}
                        description={modalDescription}
                        isDeviceDecisionModal={isDeviceDecisionModal}
                        setValue={setValue}
                    /> : null
            }

        </Container >
    );
}

export default VerificationPage;
