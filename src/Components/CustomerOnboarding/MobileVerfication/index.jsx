import MOBILE_VERIFICATION_LOGO from 'src/Assets/images/mobileVerificationIcon.png';
import VerificationPage from 'src/Common/VerificationPage';

const MobileVerification = ({ setValue, getValues }) => {
    const CUSTOMER_MOBILE_NUMBER = getValues('customerMobile')
    let cleanedNumber = CUSTOMER_MOBILE_NUMBER.replace(/-/g, '');
    const NUMBER_FOR_OTP = '+92' + cleanedNumber.slice(1)

    return (
        <VerificationPage
            icon={MOBILE_VERIFICATION_LOGO}
            title={'Mobile Verification'}
            content={"We have sent a verification code to verify your mobile number"}
            description={`sent to ${NUMBER_FOR_OTP}`}
            goBackContent={"Change Mobile Number"}
            setValue={setValue}
            getValues={getValues}
        />
    )
}

export default MobileVerification