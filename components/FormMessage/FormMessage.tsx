import React from 'react';
import styles from './FormMessage.module.scss';

type Props = {
  message: string;
  type?: string;
  nofill?: boolean;
};

const FormMessage = ({ message, type, nofill }: Props) => {
  return nofill ? (
    <div
      className={`${styles.wrapperNoFill} ${
        type === 'error' ? styles.error : styles.success
      }`}
    >
      {message}
    </div>
  ) : (
    <div
      className={`${styles.wrapperFill} ${
        type === 'error' ? styles.error : styles.success
      }`}
    >
      {message}
    </div>
  );
};

export default FormMessage;
