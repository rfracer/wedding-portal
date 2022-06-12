import React from 'react';
import styles from './FormMessage.module.scss';

type Props = {
  message: string;
  type: string;
};

const FormMessage = ({ message, type }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        type === 'error' ? styles.error : styles.success
      }`}
    >
      {message}
    </div>
  );
};

export default FormMessage;
