import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { Box, Typography } from '@mui/material';
import { clearIndexDb, getScreenData } from 'src/Utils/Helpers';
import styles from './index.module.scss'
import { FaCircleCheck } from "react-icons/fa6";

const ApplicationComplete = ({ reset }) => {
    const NAVIGATE_TO = useNavigate()
    const { TITLE, DESCRIPTION, FIELDS } = getScreenData();
    const trackingID = FIELDS[0].userValue;

    const handleClick = () => {
        localStorage.clear()
        clearIndexDb()
        reset()
        NAVIGATE_TO('/')
    }

    return (
        <div className={styles.topWrapper}>
            <FaCircleCheck className={styles.successLogoWrapper} />
            <h2 className={styles.titleWrapper}>{TITLE}</h2>
            <p className={styles.descriptionWrapper}>{DESCRIPTION}</p>
            <Box className={styles.backButtonContainer}>
                <div onClick={handleClick} className={styles.backButtonWrapper}>
                    <MdHome style={{ color: '#5093e0', fontSize: '24px' }} />
                    <Typography sx={{ fontSize: { xs: '14px', sm: '14px', lg: '16px', xl: '16px' } }} component='span'>Go to Homepage</Typography>
                </div>
            </Box>
            <Box maxWidth={'md'} className={styles.boxWrapper}>
                <p className={styles.boxTitle}>Application Tracking ID</p>
                <h1 className={styles.trackingID}>{trackingID}</h1>
            </Box>
        </div>
    );
}

export default ApplicationComplete