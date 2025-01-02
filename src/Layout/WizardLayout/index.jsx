import { Box, Fade, Grid } from '@mui/material';
import UNDRAW from 'src/Assets/images/undraw.svg';
import styles from "./index.module.scss";


const WizardLayout = ({ Icon, title, description, children }) => {
    return (
        <Grid container spacing={2}>
            {/* MAIN CONTENT */}
            <Grid item xs={12} md={6}>
                <Box className={styles.iconBox}>
                    <img src={Icon} className={styles.icon} />
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
            </Grid>

            {/* HERO IMAGE */}
            <Grid item md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>
                <img src={UNDRAW} alt="WALLET" className={styles.heroImage} />
            </Grid>


        </Grid>
    )
}

export default WizardLayout