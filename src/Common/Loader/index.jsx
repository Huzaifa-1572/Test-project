import React from 'react';
import styles from './index.module.scss'; // Import the SCSS module
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import OCR_LOADER from 'src/Assets/images/OCR_LOADER.svg'
import Backdrop from '@mui/material/Backdrop';


const Loader = () => {
  const CURRENT_SCREEN = useSelector((state) => state?.currentScreenState);

  return (
    <div className={styles.spinner}>
      {
        CURRENT_SCREEN === 'scr_uploadCnicBack' ?
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <img src={OCR_LOADER} alt='Loader' />
              <Box sx={{ fontSize: '14px', textAlign: 'center', margin: '30px 0px' }}>
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
