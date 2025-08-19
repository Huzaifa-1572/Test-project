import { Button, Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WARNING_UNDRAW from 'src/Assets/images/bulb.png';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import styles from './index.module.scss';
import { toSentenceCase } from 'src/Utils/Helpers';
import axios from 'axios';
import { BASE_URL } from 'src/Utils/Config';
import { useFormContext } from 'react-hook-form';
import { UPDATE_CNIC_INITIATE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission';
import usePostDataToServer from 'src/Hooks/usePostdataToServer';
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess';


const ERROR_CODES = ["Access Denied-403", "Error-401"]

const ErrorModal = ({ errorCode, errorMessage, isError, custIdentityValue }) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: mutateEdit } = usePostDataToServer({ onPostReqSuccess: onSuccessfullEdit, dispatch });



  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }));
    if (ERROR_CODES.includes(errorCode)) {
      navigate('/');
    }
  };

  const handleUpdate = () => {
    const CUSTOMER_CNIC = localStorage.getItem('customer_reference_key') || '';
    const { BODY, API_URL } = UPDATE_CNIC_INITIATE_HANDLER({ customerCnic: CUSTOMER_CNIC });
    mutateEdit({ BODY, API_URL, dispatch });
  };

  function onSuccessfullEdit(response) {
    postRequestSuccess({ response, dispatch, navigate })
    handleClose();
  }

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
          <p className={styles.dialogTitle}>Oh no!</p>
          <p className={styles.dialogContent}>{toSentenceCase(errorMessage) || 'something went wrong!'}</p>
          {errorCode === 'Error-103' ? (
            <Button className={styles.dialogButton} type='button' onClick={handleUpdate}>Update</Button>
          ) : (
            <Button className={styles.dialogButton} onClick={handleClose}>OK</Button>
          )}
        </div>
      </div>
    </Dialog >
  );
};

export default ErrorModal;
