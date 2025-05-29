import { Box, Button, Dialog, IconButton } from '@mui/material';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { getUUID, isSmallScreen, toSentenceCase } from 'src/Utils/Helpers';
import videoTutorial from '../../Assets/liveness_detection_tutorial.mp4';
import styles from './index.module.scss';

const GuidelinesModal = ({ showHelp, handleClose, icon, title, guidelines }) => {
    const [openVideo, setOpenVideo] = useState(false);

    const handleOpenVideo = () => {
        setOpenVideo(true);
    };

    const handleCloseVideo = () => setOpenVideo(false);

    return (
        <>
            <Dialog
                open={showHelp}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        margin: { xs: 0, sm: '32px' },
                        position: { xs: 'fixed', sm: 'relative' },
                        bottom: { xs: 0, sm: 'auto' },
                        borderRadius: { xs: '30px 30px 0 0', sm: '8px' },
                        width: "100%",
                        maxHeight: { xs: '90vh', sm: 'auto' }
                    }
                }}
            >
                <div className={styles.mainContainer}>
                    <div className={styles.dialogIconBox}>
                        <img src={icon} alt='Guidelines' height={'100px'} width={'100%'} />
                    </div>

                    <Box sx={{ padding: '0px 20px', borderRadius: '8px' }}>
                        <Box className={styles.dialogTitle}>
                            {toSentenceCase(title)}
                        </Box>
                        {isSmallScreen() && (
                            <Box sx={{ textAlign: 'center', margin: '10px 0px' }} onClick={handleOpenVideo}>
                                <span style={{ textDecoration: 'underline', color: '#e8927c', cursor: 'pointer' }}>
                                    Watch Video Tutorial
                                </span>
                            </Box>
                        )}
                        <Box sx={{ textAlign: 'left', fontSize: '14px' }}>
                            {guidelines?.map((guideline) => (
                                <Box key={getUUID()} sx={{ margin: '13px 0px', color: '#696969' }}>
                                    <strong style={{ color: '#407ec9', fontSize: '14px' }}>
                                        {toSentenceCase(guideline?.heading)}
                                    </strong> {toSentenceCase(guideline?.content)}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2, marginBottom: '10px' }}>
                        <Button className={styles.dialogButton} onClick={handleClose}>GOT IT</Button>
                    </Box>
                </div>
            </Dialog>

            {/* Fullscreen Video Dialog */}
            <Dialog
                fullScreen
                open={openVideo}
                onClose={handleCloseVideo}
                aria-labelledby="video-dialog-title"
                disableScrollLock={true}

            >
                <Box sx={{ position: 'relative', height: '100vh', bgcolor: 'black' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseVideo}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 10,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                            }
                        }}
                    >
                        <IoMdClose size={30} color='#407ec9' />
                    </IconButton>
                    <video
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            backgroundColor: 'black'
                        }}
                        controls="true"
                        autoPlay
                        muted
                        playsInline
                        webkit-playsinline="true"
                        x5-playsinline="true"
                        preload="metadata" // or "auto"
                        poster="" // Add a poster image if available
                    >
                        <source src={videoTutorial} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Dialog>
        </>
    );
};

export default GuidelinesModal;