import { Button, Dialog } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import { CgCloseO } from "react-icons/cg";
import styles from './index.module.scss';

const ErrorModal = ({ errorCode, errorMessage, isError }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }))
    if (errorCode === "Access Denied-403") {
      navigate('/')
    }
  }

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
          margin: '32px 0',
          borderRadius: '8px',
          width: "calc(100% - 40px)"
        }
      }}
    >
      <div className={styles.mainContainer}>
        <div className={styles.dialogIconBox}>
          <CgCloseO onClick={handleClose} className={styles.dialogIcon} />
        </div>
        <div className={styles.dialogContentBox}>
          <p className={styles.dialogTitle}>{errorCode || 'Ooops!'}</p>
          <p className={styles.dialogContent}>{errorMessage || 'Something Went Wrong!'}</p>
          <Button className={styles.dialogButton} onClick={handleClose}>Try Again!</Button>
        </div>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
