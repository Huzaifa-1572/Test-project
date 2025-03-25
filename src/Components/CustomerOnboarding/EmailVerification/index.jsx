import React from 'react'
import VerificationPage from 'src/Common/VerificationPage';
// import EMAIL_VERIFICATION from 'src/Assets/images/emailVerificationIcon.png'
import EMAIL_VERIFICATION from 'src/Assets/images/email-otp.svg'


const EmailVerification = ({ setValue, getValues }) => {
    const CUSTOMER_EMAIL = getValues('customerEmail')
    const SENT_TO_CONTENT = () => {
        return (
            <>
                sent to {CUSTOMER_EMAIL}
            </>
        );
    };

    return (
        <VerificationPage
            icon={EMAIL_VERIFICATION}
            title={'Email Verification'}
            content={"Please enter the one time passcode which was sent to your email address"}
            goBackContent={"Change Email Address"}
            description={SENT_TO_CONTENT()}
            setValue={setValue}
            getValues={getValues}
        />
    )
}

export default EmailVerification