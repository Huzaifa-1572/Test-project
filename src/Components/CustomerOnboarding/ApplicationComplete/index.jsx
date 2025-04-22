import { Container, Typography } from '@mui/material';
import { CiLogin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import APPLICATION_SUBMITTED_UNDRAW from 'src/Assets/images/applicationSubmittedUndraw.svg';
import APPLICATION_SUBMITTED_UNDRAW_SM from 'src/Assets/images/applicationSubmittedUndraw_sm.svg';
import { clearIndexDb, getScreenData, isSmallScreen } from 'src/Utils/Helpers';
import styles from './index.module.scss';



const ApplicationComplete = ({ reset }) => {
    const NAVIGATE_TO = useNavigate()
    const { FIELDS } = getScreenData();
    const trackingID = FIELDS[0]?.userValue;
    const MOBILE_DEVICE_DATA = JSON.parse(sessionStorage.getItem('device'))
    const deviceId = MOBILE_DEVICE_DATA?.deviceId


    const handleClick = () => {
        localStorage.clear()
        clearIndexDb()
        reset()
        if (deviceId === 'temp') {
            NAVIGATE_TO('/')
        }
        else {
            // FOR MOBILE APP
            const data = { event: "buttonClicked", message: "buttonClicked" };
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }

    }

    return (
        <div className={styles.topWrapper}>
            <img src={isSmallScreen() ? APPLICATION_SUBMITTED_UNDRAW_SM : APPLICATION_SUBMITTED_UNDRAW} alt='Success' height={140} />
            <h1 className={styles.mainHeading}>Thankyou!</h1>
            <h2 className={styles.titleWrapper}>Application submitted successfully.</h2>
            <p className={styles.descriptionWrapper}>
                <strong>Your account verification is pending</strong>. Our team is reviewing your application. You'll be notified once it's approved. Thank you for choosing us!
            </p>

            <Container maxWidth={'sm'} className={styles.boxWrapper}>
                <p className={styles.boxTitle}>Application Tracking ID #</p>
                <h1 className={styles.trackingID}>{trackingID}</h1>


                <div onClick={handleClick} className={styles.backButtonWrapper}>
                    <CiLogin style={{ color: '#e8927c', fontSize: '24px' }} />
                    <Typography sx={{ fontSize: { xs: '14px', sm: '14px', lg: '16px', xl: '16px' } }} component='span'>
                        {deviceId === 'temp' ? 'Go to Homepage' : 'Login'}
                    </Typography>
                </div>
            </Container>
        </div>
    );
}

export default ApplicationComplete