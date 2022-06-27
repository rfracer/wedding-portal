import React from 'react';
import styles from './Modal.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

type Props = {
  isOpen: boolean;
  children?: React.ReactNode;
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
  modalHeader: string;
};

ReactModal.setAppElement('#__next');

const Modal = ({ isOpen, children, handleClose, modalHeader }: Props) => {
  if (!isOpen) return null;

  return (
    <ReactModal
      className={styles.wrapper}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <header className={styles.header}>
        <h1>{modalHeader}</h1>
        <div className={styles.closeBtn} onClick={handleClose}>
          <IoCloseOutline title='Close icon' />
        </div>
      </header>
      <div className={styles.contentWrapper}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
