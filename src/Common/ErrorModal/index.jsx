import { Dialog, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import CloseIcon from 'src/Assets/images/closeicon.png';
import ErrorOutlineIcon from 'src/Assets/svgs/error-modal-icon.svg';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import styles from './index.module.scss';

const ErrorModal = ({ errorCode, errorMessage, isError }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }))
  }

  return (
    <Dialog
      open={isError}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <IconButton onClick={handleClose} sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
        zIndex: 9999,
      }}>
        <img
          height={'30px'}
          width={'30px'}
          src={CloseIcon}
        />
      </IconButton>
      <div className={styles.mainContainer}>
        <img src={ErrorOutlineIcon} alt="Error Icon" className={styles.dialogIcon} />
        <p className={styles.dialogTitle}>{errorCode || '500'}</p>
        <p className={styles.dialogContent}>{errorMessage || 'Something Went Wrong!'}</p>
        <button onClick={handleClose} className='xl green'>
          Close
        </button>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
