import { Box, Container, Typography } from '@mui/material';
import { MdHome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import APPLICATION_SUBMITTED_UNDRAW from 'src/Assets/images/applicationSubmittedUndraw.svg';
import { clearIndexDb, getScreenData } from 'src/Utils/Helpers';
import styles from './index.module.scss';

const ApplicationComplete = ({ reset }) => {
    const NAVIGATE_TO = useNavigate()
    const { FIELDS } = getScreenData();
    const trackingID = FIELDS[0]?.userValue;

    const handleClick = () => {
        localStorage.clear()
        clearIndexDb()
        reset()
        NAVIGATE_TO('/')
    }

    return (
        <div className={styles.topWrapper}>
            <img src={APPLICATION_SUBMITTED_UNDRAW} alt='Success' height={200} />
            <h1 className={styles.mainHeading}>Thankyou!</h1>
            <h2 className={styles.titleWrapper}>Application Submitted Successfully</h2>
            <p className={styles.descriptionWrapper}>
                Our team is reviewing your application. You'll be notified once it's approved. Thank you for choosing us!
            </p>

            <Container maxWidth={'sm'} className={styles.boxWrapper}>
                <p className={styles.boxTitle}>Application Tracking ID #</p>
                <h1 className={styles.trackingID}>{trackingID}</h1>
            </Container>

            <div onClick={handleClick} className={styles.backButtonWrapper}>
                <MdHome style={{ color: '#e8927c', fontSize: '24px' }} />
                <Typography sx={{ fontSize: { xs: '14px', sm: '14px', lg: '16px', xl: '16px' } }} component='span'>Go to Homepage</Typography>
            </div>
        </div>
    );
}

export default ApplicationComplete