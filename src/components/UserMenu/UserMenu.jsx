import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import sprite from '../../assets/icons/sprite.svg'; // путь к спрайту
import { AddArticleForm } from '../AddArticleForm/AddArticleForm';
import styles from './UserMenu.module.css';

export default function UserMenu({ showCreate = true, showName = true, showExit = true }) {
  const { user } = useSelector((state) => state.auth);

  const [addOpen, setAddOpen] = useState(false);
  //   const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        {showCreate && (
          <button className={`${styles.btn} ${styles.create}`} onClick={() => setAddOpen(true)}>
            Create an article
          </button>
        )}
        <div className={styles.wrp}>
          {showName && (
            <div className={styles.userInfo}>
              <img
                className={styles.avatar}
                src={user?.avatar || '/default-avatar.png'}
                //   alt={user?.name || 'User'}
              />
              <span className={styles.name}>{user?.name || 'User'}</span>
              <span className={styles.divider} />
            </div>
          )}

          {showExit && (
            <button
              className={`${styles.btn} ${styles.exit}`}
              // onClick={() => setLogoutOpen(true)}
              aria-label="Log out"
            >
              <svg width="24" height="24">
                <use href={`${sprite}#icon-log-out`} />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* модалки */}
      {addOpen && <AddArticleForm onClose={() => setAddOpen(false)} />}
      {/* 
      <LogoutModal isOpen={logoutOpen} onRequestClose={() => setLogoutOpen(false)} /> */}
    </>
  );
}
