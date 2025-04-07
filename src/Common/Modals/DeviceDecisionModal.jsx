import { Box, Button, Dialog } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WARNING_UNDRAW from 'src/Assets/images/bulb.png';
import styles from './index.module.scss';
import { closeDeviceDecisionModal } from 'src/Redux/Reducers/DeviceDecisionModalState';
import { toSentenceCase } from 'src/Utils/Helpers';


const DeviceDecisionModal = ({ title, description, isDeviceDecisionModal, setValue }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinue = () => {
        dispatch(closeDeviceDecisionModal({ title: '', description: '', isDeviceDecisionModal: false }));
        setValue('CUSTOMER_CONTINUE_WITH_NEW_DEVICE', true)
    }

    const handleAbort = () => {
        dispatch(closeDeviceDecisionModal({ title: '', description: '', isDeviceDecisionModal: false }));
        navigate('/');
    };

    return (
        <Dialog
            open={isDeviceDecisionModal}
            onClose={false}
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
                <img src={WARNING_UNDRAW} alt='Warning' className={styles.bulb} />
                <div className={styles.dialogContentBox}>
                    <p className={styles.dialogTitle}>{toSentenceCase(title) || 'Error!'}</p>
                    <p className={styles.dialogContent}>{toSentenceCase(description) || 'something went wrong!'}</p>
                    {/* DECISION BUTTON */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <Button variant="outlined" sx={{ marginRight: '15px' }} onClick={handleAbort}> Abort</Button>
                        <Button variant="contained" onClick={handleContinue}>Continue</Button>
                    </Box>
                </div>
            </div>
        </Dialog >
    );
};

export default DeviceDecisionModal;
