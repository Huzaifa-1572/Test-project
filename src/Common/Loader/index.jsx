import React from "react";
import styles from "./index.module.scss"; 

const Loader = () => {
  return (
    <div className={styles.spinnerDiv}>
      <div className={styles.loadingSpinnerRipple}>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
