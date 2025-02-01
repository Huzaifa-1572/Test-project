import { Box, Button, Dialog } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WARNING_UNDRAW from 'src/Assets/images/warning.svg';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import styles from './index.module.scss';

const ERROR_CODES = ["Access Denied-403", "Error-401"]

const ErrorModal = ({ errorCode, errorMessage, isError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }));
    if (ERROR_CODES.includes(errorCode)) {
      navigate('/');
    }
  };

  return (
    <Dialog
      open={isError}
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
          <img src={WARNING_UNDRAW} alt='Warning' height={'100%'} width={'100%'} />
        </div>
        <div className={styles.dialogContentBox}>
          <p className={styles.dialogTitle}>{errorCode || 'Error!'}</p>
          <p className={styles.dialogContent}>{errorMessage || 'something went wrong!'}</p>
          <Button className={styles.dialogButton} onClick={handleClose}>Close</Button>
        </div>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
