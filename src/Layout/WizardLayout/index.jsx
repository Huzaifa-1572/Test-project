import { Box, Container, Fade, Grid } from '@mui/material';
import UNDRAW from 'src/Assets/images/undraw.svg';
import styles from "./index.module.scss";

// THIS IS CALLED IN customerOnboardingLayout
const WizardLayout = ({ Icon, title, description, children }) => {
    return (
        <Box className={styles.mainContainer} sx={{ padding: { xs: '0px', lg: '20px 80px' } }}>
            <Container maxWidth="xl" className={styles.contentContainer} sx={{ padding: { lg: '45px 60px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: { lg: '15px' } }}>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* MAIN CONTENT */}
                    <Grid item xs={12} md={8}>
                        <Box className={styles.iconBox} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                    <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: "flex-end" }}>
                        <img src={UNDRAW} alt="WALLET" className={styles.heroImage} />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}

export default WizardLayout