import React from 'react'
import VerificationPage from 'src/Common/VerificationPage';
// import mobileOtpLogo from "src/Assets/svgs/mobileotp.svg";

const MobileVerification = ({ setValue, getValues }) => {
    return (
        <VerificationPage
            // icon={mobileOtpLogo}
            title={'Mobile Verification'}
            content={"Please enter the one time passcode which is sent to your mobile number"}
            setValue={setValue}
            getValues={getValues}
        />
    )
}

export default MobileVerification