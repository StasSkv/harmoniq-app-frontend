import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import s from './ModalErrorSave.module.css';
import sprite from '../../assets/icons/sprite.svg';

Modal.setAppElement('#root');

const ModalError = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.modalOverlay}
      className={s.modalContent}
    >
      <button className={s.modalClose} onClick={onClose} aria-label="Close modal">
        <svg width="24" height="24" className={s.icon}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>

      <h2 className={s.modalTitle}>Error while saving</h2>
      <div className={s.modalDescription}>
        <p style={{ whiteSpace: 'pre-line' }}>
          To save this article, you need to{'\n'}authorize first
        </p>
      </div>

      <div className={s.modalActions}>
        <Link to="/login" className={s.modalLink}>
          Login
        </Link>
        <Link to="/register" className={s.modalLink}>
          Register
        </Link>
      </div>
    </Modal>
  );
};

export default ModalError;
