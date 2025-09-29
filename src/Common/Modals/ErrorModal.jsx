import { Box, Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WARNING_UNDRAW from 'src/Assets/Icons/sessionTimeOut.png';
import CustomButton from 'src/Common/CustomButton';
import usePostDataToServer from 'src/Hooks/usePostdataToServer';
import { updateCurrentScreen } from 'src/Redux/Reducers/CurrentScreenState';
import { closeErrorModal } from 'src/Redux/Reducers/ErrorState';
import { triggerRecaptchaReset } from 'src/Redux/Reducers/RecaptchaState';
import { UPDATE_CNIC_INITIATE_HANDLER } from 'src/Utils/CommonFunctions/COFormSubmission';
import postRequestSuccess from 'src/Utils/CommonFunctions/postRequestSuccess';
import { toSentenceCase } from 'src/Utils/Helpers';
import styles from './index.module.scss';


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
    dispatch(triggerRecaptchaReset()); // Reset recaptcha when error modal is closed
    if (ERROR_CODES.includes(errorCode)) {
      navigate('/');
    }
  };

  const handleUpdate = () => {
    const CUSTOMER_CNIC = localStorage.getItem('customer_reference_key') || '';
    const { BODY, API_URL } = UPDATE_CNIC_INITIATE_HANDLER({ customerCnic: CUSTOMER_CNIC });
    mutateEdit({ BODY, API_URL, dispatch });
    handleClose();
  };

  function onSuccessfullEdit(response) {
    postRequestSuccess({ response, dispatch, navigate })
    handleClose();
  }

  const handleYes = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }));
    dispatch(triggerRecaptchaReset()); // Reset recaptcha when proceeding with new account flow
    dispatch(updateCurrentScreen('scr_customerCnic'));
  };

  const handleNo = () => {
    dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }));
    dispatch(triggerRecaptchaReset()); // Reset recaptcha when navigating home
    navigate('/');
  };

  // Helper to render action buttons based on errorCode
  const renderActionButtons = () => {
    switch (errorCode) {
      // FOR CNIC UPDATE FLOW
      case 'Error-103':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <CustomButton label="Update" type="button" onClick={handleUpdate} />
            </Box>
          </Box>
        );
      // FOR SOMEONE INITIATING NEW ACCOUNT FLOW FROM RESUME FLOW
      case 'Error-104':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ width: '120px' }}>
              <CustomButton label="Yes" onClick={handleYes} Icon={<IoMdCheckmark />} />
            </Box>
            <Box sx={{ width: '120px' }}>
              <CustomButton label="No" onClick={handleNo} Icon={<IoMdClose />} />
            </Box>
          </Box>
        );
      default:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <CustomButton label="OK" onClick={handleClose} />
            </Box>
          </Box>
        );
    }
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
