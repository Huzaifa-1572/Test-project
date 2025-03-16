import { Box, Button, Dialog, Typography } from '@mui/material';
import GUIDELINE_UNDRAW from 'src/Assets/images/guideline.svg';
import styles from './index.module.scss';

const LivenessHelpModal = ({ showHelp, handleClose }) => {
    return (
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
                        xs: 'auto 0 0 0', // Bottom for small screens
                        sm: '32px' // Center for larger screens
                    },
                    position: {
                        xs: 'fixed', // Fixes it at the bottom
                        sm: 'relative' // Default behavior
                    },
                    bottom: {
                        xs: 0, // Align to the bottom for small screens
                        sm: 'auto'
                    },
                    borderRadius: {
                        xs: '30px 30px 0 0', // Rounded corners on top for bottom modal
                        sm: '8px' // Default behavior for larger screens
                    },
                    width: "100%"
                }
            }}
        >
            <div className={styles.mainContainer}>
                <div className={styles.dialogIconBox}>
                    <img src={GUIDELINE_UNDRAW} alt='Warning' height={'100%'} width={'100%'} />
                </div>
                <Box sx={{ padding: '5px 20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <Box sx={{ fontSize: 'clamp(16px,3vw,20px)', textAlign: 'center', color: '#407ec9', fontWeight: 'bold', marginBottom: '5px' }}>
                        Face Detection Guidelines
                    </Box>
                    <Box sx={{ textAlign: 'left', fontSize: '14px' }}>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>No Glasses:</strong> Strictly don’t wear glasses. If wearing, please remove them.
                        </Box>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>Face Detection:</strong> Keep your face well-lit, centered, and fully visible.
                        </Box>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>Eye Blinking:</strong>when blinking, kindly Pause/close your eyes for at least 1–2 seconds.
                        </Box>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>Head Movement:</strong> Move your head slowly in the asked direction, and pause your posture for at least 1–2 seconds.
                        </Box>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>Good Lighting:</strong> Ensure you’re in a well-lit environment with no strong backlight or shadows.
                        </Box>
                        <Box sx={{ margin: '13px 0px' }}>
                            <strong style={{ color: '#e4002b', fontSize: '14px' }}>Avoid Blurriness:</strong> Keep the camera focused and the image sharp.
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                    <Button className={styles.dialogButton} onClick={handleClose}>Close</Button>
                </Box>
            </div>
        </Dialog >
    );
};

export default LivenessHelpModal;
