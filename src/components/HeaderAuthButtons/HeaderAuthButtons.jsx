import { Link } from 'react-router-dom';
import s from './HeaderAuthButtons.module.css';

export default function HeaderAuthButtons({ showJoin = true, showLogin = true, onLinkClick }) {
  return (
    <div className={s.wrapper}>
      {showLogin && (
        <Link to="/login" className={`${s.btn} ${s.login}`} onClick={onLinkClick}>
          Log in
        </Link>
      )}
      {showJoin && (
        <Link to="/register" className={`${s.btn} ${s.join}`} onClick={onLinkClick}>
          Join now
        </Link>
      )}
    </div>
  );
}
