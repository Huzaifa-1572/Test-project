import { Dialog, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import ErrorOutlineIcon from 'src/Assets/svgs/error-modal-icon.svg';
import CloseIcon from 'src/Assets/images/closeicon.png';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import { clearIndexDb } from 'src/Utils/Helpers';

const ErrorModal = ({ errorCode, errorMessage, isError }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    //This condition is for when api returns session expired error i.e. I have to navigate to root page
    if (errorCode?.includes('E41')) {
      dispatch(closeErrorModal({ errorCode: '', errorMessage: '', showErrorModal: false }))
      navigate('/')
      localStorage.clear();
      clearIndexDb()
    }
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', showErrorModal: false }))
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
        <p className={styles.dialogTitle}>{errorCode}</p>
        <p className={styles.dialogContent}>{errorMessage}</p>
        <button onClick={handleClose} className='xl green'>
          Close
        </button>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
