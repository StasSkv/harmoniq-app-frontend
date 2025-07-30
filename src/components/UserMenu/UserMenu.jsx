import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';
import s from './UserMenu.module.css';
import { LogoutModal } from '../LogoutModal/LogoutModal';
import defaultAvatar from '../../assets/images/avatar/image1х.webp';

export default function UserMenu({
  showCreate = true,
  showName = true,
  showExit = true,
  onLinkClick,
  onCloseMenu,
}) {
  const { user } = useSelector((state) => state.auth);
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  const handleCreateClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
    if (onCloseMenu) {
      onCloseMenu();
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        {showCreate && (
          <Link to="/create" className={`${s.btn} ${s.create}`} onClick={handleCreateClick}>
            Create an article
          </Link>
        )}
        <div className={s.wrp}>
          {showName && (
            <div className={s.userInfo}>
              <img
                className={s.avatar}
                src={user?.avatar || defaultAvatar}
                alt={user?.name || 'User'}
              />
              <span className={s.name}>{user?.name || 'User'}</span>
              <span className={s.divider} />
            </div>
          )}

          {showExit && (
            <button
              className={`${s.btn} ${s.exit}`}
              onClick={() => setLogoutOpen(true)}
              aria-label="Log out"
            >
              <svg width="24" height="24">
                <use href={`${sprite}#icon-log-out`} />
              </svg>
            </button>
          )}
        </div>
      </div>

      <LogoutModal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
}
