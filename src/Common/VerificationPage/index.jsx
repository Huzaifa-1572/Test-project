import OtpInput from 'react-otp-input';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import usePostDataToServer from 'src/Hooks/usePostdataToServer';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTEMAIL_HANDLER, CUSTMOBILE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission';
import { useNavigate } from 'react-router-dom';
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess';
import { updateCurrentScreen } from 'src/Redux/Reducers/CurrentScreenState';
import { updatePrevScreen } from 'src/Redux/Reducers/PrevScreenState';

function VerificationPage({ icon, title, content, goBackContent, setValue, getValues }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [resendOTP, setResendOTP] = useState(59);
    const IS_RESUME_FLOW = localStorage.getItem('isResume') || false;
    const SCREEN_NAME = useSelector(state => state?.prevScreenState)

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

        if (SCREEN_NAME === 'scr_customerMobile') {
            const { BODY, API_URL } = CUSTMOBILE_HANDLER({ CURRENT_SCREEN: SCREEN_NAME, data, isResumeApplication: IS_RESUME_FLOW })
            mutate({ BODY, API_URL, dispatch })
        }

        if (SCREEN_NAME === 'scr_customerEmail') {
            const { BODY, API_URL } = CUSTEMAIL_HANDLER({ CURRENT_SCREEN: SCREEN_NAME, data })
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
        if (SCREEN_NAME === 'scr_customerMobile') {
            const PREV_SCREEN = 'scr_customerCnic'
            dispatch(updateCurrentScreen(SCREEN_NAME));
            dispatch(updatePrevScreen(PREV_SCREEN));
        }

        if (SCREEN_NAME === 'scr_customerEmail') {
            const PREV_SCREEN = 'scr_hasValidEmail'
            dispatch(updatePrevScreen(PREV_SCREEN));
            dispatch(updateCurrentScreen(SCREEN_NAME));
        }
    }

    return (
        <Box sx={{ backgroundColor: '#F4F4F4' }}>
            <Container maxWidth="lg" className={styles.paperContainer} sx={{ borderRadius: { sm: '0px', md: '0px', lg: '10px', xl: '10px' } }} >
                <div className={styles.iconStyle}>
                    <img className={styles.iconSize} src={icon} alt="mobileOtpLogo" />
                </div>
                <h2 className={styles.mainHeading}>{title}</h2>
                <p className={styles.content}>
                    {content}
                </p>

                <div className={styles.OptContainer}>
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange}
                        numInputs={6}
                        isInputNum={true}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={styles.inputStyle}
                        shouldAutoFocus={true}
                    />
                </div>

                <div>
                    <button
                        className='large green'
                        type='submit'
                        disabled={otp.length < 6}
                    >
                        Verify
                    </button  >
                </div>

                <div>
                    <div className={styles.resendOTP} >
                        {resendOTP === 0 ? (
                            <button type='button' className={styles.countdownStyle} onClick={handleResendClick}>
                                Resend OTP
                            </button>
                        ) : (
                            formatCountdownString()
                        )}
                    </div>
                </div>

                {
                    goBackContent &&
                    <p className={styles.content} style={{ marginTop: "12px" }}>
                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleGoBack}>{goBackContent}</span>
                    </p>
                }
            </Container >
        </Box >
    );
}

export default VerificationPage;
