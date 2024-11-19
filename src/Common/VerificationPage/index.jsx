import OtpInput from 'react-otp-input';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePostDataToServer from 'src/Hooks/usePostdataToServer';
import Header from 'src/Layout/Header';
// import { COFormSubmission } from "src/Utils/CommonFunctions/COFormSubmission";
// import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess';
import GoBack from 'src/Common/GoBack';
import styles from './index.module.scss';
import useGetGeoCoordinates from 'src/Hooks/useGetGeoCoordinates';
import useGetCurrentScreen from 'src/Hooks/useGetCurrentScreen';

const ORIGINAL_SCREEN_FOR_VERIFICATION = {
    scr_mobileVerification: 'scr_mobileVerification',
    scr_emailVerification: 'scr_emailVerification',
}

function VerificationPage({ icon, title, content, setValue, getValues }) {
    const [otp, setOtp] = useState('');
    const [resendOTP, setResendOTP] = useState(30);
    const dispatch = useDispatch()
    const token = localStorage.getItem('tokenMobile')
    const SCREEN = useGetCurrentScreen()
    const IS_RESUME_FLOW = localStorage.getItem('isResume')

    // setting geo co ordinates value
    useGetGeoCoordinates({ setValue, getValues })

    const { mutate: handleOtpVerification } = usePostDataToServer({ onPostReqSuccess: onSuccessfullOtpVerification, dispatch });


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
    };

    const handleVerify = (selectedOption) => {
        setValue('e__otp', selectedOption)
        console.log('dshjcvjdhsc', token)
        const BODY = {
            otp: "123456",
            mobileNumber: "03459872345",
            token: token,
            custIdentityValue: "1398765412345",
            custIdentityKey: "0001",
            channelCode: "0013"
        }
        const API_URL = "http://192.168.20.101:8080/api/dao/v1/otp/validate-sms-otp";
        handleOtpVerification({ BODY, API_URL });
    }

    // Function to format the countdown string
    const formatCountdownString = () => {
        return `Resend in ${String(Math.floor(resendOTP / 60)).padStart(2, '0')}:${String(
            resendOTP % 60
        ).padStart(2, '0')}`;
    };

    const handleResendClick = () => {
        // setOtp('')
        // const data = getValues()
        // const CURRENT_SCREEN = IS_RESUME_FLOW ? 'scr135_resumeDAO' : ORIGINAL_SCREEN_FOR_VERIFICATION[SCREEN]

        // const FORM_SUBMISSION_DATA = COFormSubmission[CURRENT_SCREEN]
        // const { BODY, API_URL } = FORM_SUBMISSION_DATA({ CURRENT_SCREEN, data })
        // mutate({ BODY, API_URL, dispatch })

        // // Reset the timer to 60 seconds
        // if (resendOTP === 0) {
        //     setResendOTP(60);
        // }
    };

    function onSuccessfullOtpVerification(response) {
        postRequestSuccess({ response, dispatch })
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
                    />
                </div>

                <div>
                    <button
                        className='large green'
                        onClick={() => handleVerify(otp)}
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
            </Container >
        </Box >
    );
}

export default VerificationPage;
