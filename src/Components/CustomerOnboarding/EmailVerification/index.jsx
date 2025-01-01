import React from 'react'
import VerificationPage from 'src/Common/VerificationPage';
// import mobileOtpLogo from "src/Assets/svgs/mobileotp.svg";

const EmailVerification = ({ setValue, getValues }) => {
    return (
        <VerificationPage
            // icon={mobileOtpLogo}
            title={'Email Verification'}
            content={"Please enter the one time passcode which was sent to your email address"}
            setValue={setValue}
            getValues={getValues}
        />
    )
}

export default EmailVerification