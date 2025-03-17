import { Box, Button, Dialog } from '@mui/material';
import GUIDELINE_UNDRAW from 'src/Assets/images/userFace.png';
import styles from './index.module.scss';
import { getUUID } from 'src/Utils/Helpers';

const GUIDELINES = [
    {
        heading: 'No Glasses:',
        content: 'Strictly don’t wear glasses. If wearing, please remove them.'
    },
    {
        heading: 'Face Detection:',
        content: 'Keep your face well-lit, centered, and fully visible.'
    },
    {
        heading: 'Eye Blinking:',
        content: 'When blinking, kindly Pause/close your eyes for at least 1–2 seconds.'
    },
    {
        heading: 'Head Movement:',
        content: 'Move your head slowly in the asked direction, and pause your posture for at least 1–2 seconds.'
    },
    {
        heading: 'Good Lighting:',
        content: 'Ensure you’re in a well-lit environment with no strong backlight or shadows.'
    },
    {
        heading: 'Avoid Blurriness:',
        content: 'Keep the camera focused and the image sharp.'
    }
];

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
                    <img src={GUIDELINE_UNDRAW} alt='Warning' height={'100px'} width={'100%'} />
                </div>
                <Box sx={{ padding: '0px 20px', borderRadius: '8px' }}>
                    <Box className={styles.dialogTitle}>
                        Face Detection Guidelines
                    </Box>
                    <Box sx={{ textAlign: 'left', fontSize: '14px' }}>
                        {GUIDELINES?.map((guideline) => (
                            <Box key={getUUID()} sx={{ margin: '13px 0px', color: '#696969' }}>
                                <strong style={{ color: '#e4002b', fontSize: '14px' }}>{guideline?.heading}</strong> {guideline?.content}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                    <Button className={styles.dialogButton} onClick={handleClose}>GOT IT</Button>
                </Box>
            </div>
        </Dialog>
    );
};

export default LivenessHelpModal;