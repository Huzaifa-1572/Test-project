import { Box, Fade } from '@mui/material';
import styles from "./index.module.scss";

const WizardLayout = ({ Icon, title, description, children }) => {
    return (
        <>
            <Box className={styles.iconBox}>
                <Icon className={styles.icon} size={32} />
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