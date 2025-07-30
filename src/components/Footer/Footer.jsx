import s from './Footer.module.css';
import { Container } from '../Container/Container.jsx';
import sprite from '../../assets/icons/sprite.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';

export const Footer = () => {
  const user = useSelector(selectUser);

  return (
    <footer className={s.footer}>
      <Container className={s.container}>
        <a href="/" className={s.logo}>
          <svg className={s.logoIcon} width="165" height="46">
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </a>
        <p className={s.copyright}>
          &copy; {new Date().getFullYear()} Harmoniq. All rights reserved.
        </p>
        <ul className={s.linksList}>
          <li className={s.linksItem}>
            <Link to="/articles" className={s.link}>
              Articles
            </Link>
          </li>
          <li className={s.linksItem}>
            {user ? (
              <Link to={`/authors/${user._id}`} className={s.link}>
                Account
              </Link>
            ) : (
              <Link to="/register" className={s.link}>
                Account
              </Link>
            )}
          </li>
        </ul>
      </Container>
    </footer>
  );
};
