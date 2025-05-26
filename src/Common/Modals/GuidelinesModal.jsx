import { Box, Button, Dialog, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';  // For closing full-screen video dialog
import styles from './index.module.scss';
import { getUUID, toSentenceCase } from 'src/Utils/Helpers';
import { useState } from 'react';
import { isSmallScreen } from 'src/Utils/Helpers';
import { IoMdClose } from "react-icons/io";


const GuidelinesModal = ({ showHelp, handleClose, icon, title, guidelines }) => {
    const [openVideo, setOpenVideo] = useState(false);

    const handleOpenVideo = () => setOpenVideo(true);
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
                        margin: {
                            xs: 'auto 0 0 0',
                            sm: '32px'
                        },
                        position: {
                            xs: 'fixed',
                            sm: 'relative'
                        },
                        bottom: {
                            xs: 0,
                            sm: 'auto'
                        },
                        borderRadius: {
                            xs: '30px 30px 0 0',
                            sm: '8px'
                        },
                        width: "100%"
                    }
                }}
            >
                <div className={styles.mainContainer}>
                    <div className={styles.dialogIconBox}>
                        <img src={icon} alt='Warning' height={'100px'} width={'100%'} />
                    </div>

                    <Box sx={{ padding: '0px 20px', borderRadius: '8px' }}>
                        <Box className={styles.dialogTitle}>
                            {toSentenceCase(title)}
                        </Box>
                        {isSmallScreen() ?
                            <Box sx={{ textAlign: 'center', margin: '10px 0px' }} onClick={handleOpenVideo}>
                                <span style={{ textDecoration: 'underline', color: '#e8927c' }}> Watch Video Tutorial</span>
                            </Box> : null
                        }
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
            >
                <Box sx={{ position: 'relative', height: '100dvh', bgcolor: 'black' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseVideo}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
                    >
                        <IoMdClose size={30} />
                    </IconButton>
                    <video
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        controls
                        autoPlay
                    >
                        <source src="/src/Assets/liveness_detection_tutorial.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Dialog>
        </>
    );
};

export default GuidelinesModal;
