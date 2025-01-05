import React from 'react'
import VerificationPage from 'src/Common/VerificationPage';
import MOBILE_VERIFICATION_LOGO from 'src/Assets/images/mobileVerificationIcon.png'

const MobileVerification = ({ setValue, getValues }) => {
    return (
        <VerificationPage
            icon={MOBILE_VERIFICATION_LOGO}
            title={'Mobile Verification'}
            content={"Please enter the one time passcode which is sent to your mobile number"}
            goBackContent={"Change Mobile Number"}
            setValue={setValue}
            getValues={getValues}
        />
    )
}

export default MobileVerification