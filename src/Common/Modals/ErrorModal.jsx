import { Box, Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import WARNING_UNDRAW from 'src/Assets/Icons/sessionTimeOut.png';
import CustomButton from 'src/Common/CustomButton';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import { toSentenceCase } from 'src/Utils/Helpers';
import styles from './index.module.scss';

const ErrorModal = ({ errorCode, errorMessage, isError }) => {

  const dispatch = useDispatch();

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }));
  };

  const renderActionButtons = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <CustomButton label="OK" onClick={handleClose} />
        </Box>
      </Box>
    );
  };

  return (
    <Dialog
      open={isError}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      keepMounted
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
          {/* <p className={styles.dialogTitle}>Oh no!</p> */}
          <p className={styles.dialogContent}>{toSentenceCase(errorMessage) || 'Unable to process at this time. Please try again later.'}</p>
          {renderActionButtons()}
        </div>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
