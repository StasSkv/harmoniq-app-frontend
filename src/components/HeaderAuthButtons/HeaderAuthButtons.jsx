import { Link } from 'react-router-dom';
import styles from './HeaderAuthButtons.module.css';

export default function HeaderAuthButtons({ showJoin = true, showLogin = true }) {
  return (
    <div className={styles.wrapper}>
      {showLogin && (
        <Link to="/login" className={`${styles.btn} ${styles.login}`}>
          Log in
        </Link>
      )}
      {showJoin && (
        <Link to="/register" className={`${styles.btn} ${styles.join}`}>
          Join now
        </Link>
      )}
    </div>
  );
}
