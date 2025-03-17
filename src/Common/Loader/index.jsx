import React from 'react';
import styles from './index.module.scss'; // Import the SCSS module

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.barIndicator}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default Loader;