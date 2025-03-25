import { Box, Button, Dialog } from '@mui/material';
import styles from './index.module.scss';
import { getUUID } from 'src/Utils/Helpers';



const GuidelinesModal = ({ showHelp, handleClose, icon, title, guidelines }) => {
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
                    <img src={icon} alt='Warning' height={'100px'} width={'100%'} />
                </div>
                <Box sx={{ padding: '0px 20px', borderRadius: '8px' }}>
                    <Box className={styles.dialogTitle}>
                        {title}
                    </Box>
                    <Box sx={{ textAlign: 'left', fontSize: '14px' }}>
                        {guidelines?.map((guideline) => (
                            <Box key={getUUID()} sx={{ margin: '13px 0px', color: '#696969' }}>
                                <strong style={{ color: '#407ec9', fontSize: '14px' }}>{guideline?.heading}</strong> {guideline?.content}
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

export default GuidelinesModal;