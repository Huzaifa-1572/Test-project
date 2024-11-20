import React from 'react'
import { GetIcon } from "src/Common/GetIcon";
import styles from "./index.module.scss";
import { Box, Fade } from '@mui/material';

const WizardLayout = ({ icon, title, description, children }) => {
    return (
        <>
            <Box className={styles.iconBox}>
                <GetIcon icon={icon} className={styles.icon} />
            </Box>
            <Fade in={true} timeout={800}>
                <Box className={styles.heading} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                    {title}
                </Box>
            </Fade>
            {description && (
                <Fade in={true} timeout={800}>
                    <Box className={styles.content} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                        {description}
                    </Box>
                </Fade>
            )}
            {children}
        </>
    )
}

export default WizardLayout