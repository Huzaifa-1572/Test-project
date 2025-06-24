import React, { useEffect } from 'react';
import styles from './index.module.scss'; // Import the SCSS module
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import OCR_LOADER from 'src/Assets/images/OCR_LOADER.svg'
import Backdrop from '@mui/material/Backdrop';


const Loader = () => {
  const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);

  useEffect(() => {
    return () => {
      localStorage.removeItem('GOING_BACK_FROM_CNIC_BACK');
    };
  }, []);

  return (
    <div className={styles.spinner}>
      {
        CURRENT_SCREEN === 'scr_uploadCnicBack' && !localStorage.getItem('GOING_BACK_FROM_CNIC_BACK') ?
          <Backdrop
            sx={(theme) => ({ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <Box sx={{ padding: '15px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img src={OCR_LOADER} alt='Loader' />
              <Box sx={{ fontSize: '16px', textAlign: 'center', margin: '30px 0px' }}>
                Please wait while we fetch your CNIC details. This might take a little time—we appreciate your patience!
              </Box>
              <div className={styles.barIndicator}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
            </Box>

          </Backdrop>
          :
          <div className={styles.barIndicator}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
      }

    </div>
  );
};

export default Loader;
