import { Box, Container, Fade, Typography } from '@mui/material';
import { CiLogin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import APPLICATION_SUBMITTED_UNDRAW from 'src/Assets/images/applicationSubmittedUndraw.svg';
import APPLICATION_SUBMITTED_UNDRAW_SM from 'src/Assets/Icons/successIcon.gif';
import { clearIndexDb, getScreenData, isSmallScreen, redirectToMobileApp } from 'src/Utils/Helpers';
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
            redirectToMobileApp()
        }

    }

    return (
        <div className={styles.topWrapper}>
            <h3 className={styles.mainHeading}>Application Submitted</h3>
            <h2 className={styles.titleWrapper}>Congratulation! your application submitted successfully!</h2>
            <Fade in={true} timeout={2000}>
                <Box className={styles.imageBox} sx={{ marginTop: '25px' }}>
                    <img src={isSmallScreen() ? APPLICATION_SUBMITTED_UNDRAW_SM : APPLICATION_SUBMITTED_UNDRAW} alt='Success' height={120} />
                </Box>
            </Fade>
            <p className={styles.descriptionWrapper}>
                <strong>Your account verification is pending.</strong>
                <br />
                Our team is reviewing your application. You'll be notified once it's approved. Thank you for choosing us!
            </p>


            {/* <Container maxWidth={'sm'} className={styles.boxWrapper}>
                <p className={styles.boxTitle}>Application Tracking ID #</p>
                <h1 className={styles.trackingID}>{trackingID}</h1>


                <div onClick={handleClick} className={styles.backButtonWrapper}>
                    <CiLogin style={{ color: '#e8927c', fontSize: '24px' }} />
                    <Typography sx={{ fontSize: { xs: '14px', sm: '14px', lg: '16px', xl: '16px' } }} component='span'>
                        {deviceId === 'temp' ? 'Go to Homepage' : 'Login'}
                    </Typography>
                </div>
            </Container> */}
            <Box onClick={handleClick} className={styles.backButtonWrapper}>
                {/* <CiLogin style={{ color: '#e8927c', fontSize: '24px' }} /> */}
                <Typography sx={{ fontSize: { xs: '14px', sm: '14px', lg: '16px', xl: '16px' } }} component='span'>
                    {deviceId === 'temp' ? 'Done' : 'Done'}
                </Typography>
            </Box>
        </div>
    );
}

export default ApplicationComplete