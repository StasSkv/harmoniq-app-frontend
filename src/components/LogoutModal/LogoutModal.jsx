import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { logoutThunk } from '../../redux/authSlice/authOperations';
import s from './LogoutModal.module.css';
import sprite from '../../assets/icons/sprite.svg';

Modal.setAppElement('#root');

export const LogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (err) {
      toast.error(err?.message || 'Logout failed. Please try again.');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      onClose();
      navigate('/login', { replace: true });
      dispatch({ type: 'auth/logoutSuccess' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm logout"
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <button className={s.closeBtn} onClick={onClose} aria-label="Close">
        <svg className={s.closeIcon} width="20" height="20">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      <h2 className={s.title}>Are you sure?</h2>
      <p className={s.message}>We will miss you!</p>

      <div className={s.actions}>
        <button className={`${s.btn} ${s.btnLogout}`} onClick={handleLogout}>
          Log out
        </button>

        <button className={`${s.btn} ${s.btnCancel}`} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
