import { Box, Fade, Grid } from '@mui/material';
import styles from "./index.module.scss";


// THIS IS CALLED IN customerOnboardingLayout
const WizardLayout = ({ Icon, title, description, heroImage, children }) => {
    return (
        <Grid container spacing={2} sx={{ display: "flex", marginBottom: '10px' }}>
            {/* MAIN CONTENT */}
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* FOR LARGE DEVICES */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <Box className={styles.iconBox} >
                        <img src={Icon} className={styles.icon} height="100px" />
                    </Box>
                </Box>

                {/* FOR SMALL DEVICES */}
                <Fade in={true} timeout={2000}>

                    <Box sx={{ flex: 1, marginTop: '10px' }}>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            {
                                heroImage &&
                                <Box className={styles.smallDeviceIconContainer} >
                                    <img src={heroImage} height="100px" />
                                </Box>
                            }
                        </Box>

                        <Fade in={true} timeout={800}>
                            {
                                title &&
                                <Box className={styles.heading} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                                    {title}
                                </Box>
                            }

                        </Fade>
                        {description && (
                            <Fade in={true} timeout={800}>
                                <Box className={styles.content} sx={{
                                    textAlign: { xs: "center", sm: "left" }, margin: { xs: '10px 0px', sm: '25px 0px' }
                                }}>
                                    {description}
                                </Box>
                            </Fade>
                        )}
                    </Box>
                </Fade>
                {children}
            </Grid>

            {/* HERO IMAGE */}
            <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: "flex-end" }}>
                <img src={heroImage} alt="WALLET" className={styles.heroImage} />
            </Grid>

        </Grid>
    )
}

export default WizardLayout