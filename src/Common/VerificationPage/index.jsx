import OtpInput from 'react-otp-input';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

function VerificationPage({ icon, title, content, setValue, getValues }) {
    const [otp, setOtp] = useState('');
    const [resendOTP, setResendOTP] = useState(30);

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
        setValue('customerOTP', otpValue)
    };

    // Function to format the countdown string
    const formatCountdownString = () => {
        return `Resend in ${String(Math.floor(resendOTP / 60)).padStart(2, '0')}:${String(
            resendOTP % 60
        ).padStart(2, '0')}`;
    };

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
                        type='submit'
                        disabled={otp.length < 6}
                    >
                        Verify
                    </button  >
                </div>

                <div>
                    {/* <div className={styles.resendOTP} >
                        {resendOTP === 0 ? (
                            // <button type='button' className={styles.countdownStyle} onClick={handleResendClick}>
                            //     Resend OTP
                            // </button>
                        ) : (
                            formatCountdownString()
                        )}
                    </div> */}
                </div>
            </Container >
        </Box >
    );
}

export default VerificationPage;
