import { Box, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const isResume = localStorage.getItem('isResume')

    const { mutate } = usePostDataToServer({ onPostReqSuccess: onSuccessfullFormDataSubmission, dispatch });

    useEffect(() => {
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
        <Container maxWidth="lg" className={styles.paperContainer} sx={{ borderRadius: { xs: '7px', sm: '20px' } }}>
            <div className={styles.iconStyle}>
                <img src={icon} alt="mobileOtpLogo" />
            </div>
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
                    <Button type='button' variant='outlined' size='small' className={styles.countdownStyle} onClick={handleResendClick}>
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
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={styles.inputStyle}
                    shouldAutoFocus={true}
                />
            </div>

            <Box sx={{ width: '40%' }}>
                <CustomButton label='Verify' />
            </Box>

        </Container >
    );
}

export default VerificationPage;
