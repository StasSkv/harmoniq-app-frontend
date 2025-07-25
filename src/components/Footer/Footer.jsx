import s from './Footer.module.css';
import { Container } from '../Container/Container.jsx';
import sprite from '../../assets/icons/sprite.svg';

export const Footer = () => {
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
            <a href="#articles" className={s.link}>
              Articles
            </a>
          </li>
          <li className={s.linksItem}>
            <a href="#account" className={s.link}>
              Account
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
