import React from 'react';
import styles from './index.module.scss'; // Import the styles

const ValidationError = ({ message }) => {
  return (
    <p className={styles.validationError}>
      {message}
    </p>
  );
};

export default ValidationError;
