import React, { useState, useEffect } from 'react';
import NavigationUnauth from '../Navigation/NavigationUnauth';
import HeaderAuthButtons from '../HeaderAuthButtons/HeaderAuthButtons';
import styles from './HeaderUnauth.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';

export default function HeaderUnauth() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <a href="/" className={styles.logo}>
          <svg className={styles.logoIcon} width="165" height="46">
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </a>

        {/* Десктоп */}
        <div className={styles.desktopNav}>
          <NavigationUnauth />
          <HeaderAuthButtons />
        </div>

        {/* Планшет: кнопка Join + бургер*/}
        <div className={styles.tabletArea}>
          <div className={styles.tabletJoin}>
            <HeaderAuthButtons showLogin={false} />
          </div>
          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <svg width="24" height="24">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div>

        {/* Моб: только бургер */}
        <div className={styles.mobileBurger}>
          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <svg width="24" height="24">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className={styles.menu}>
          <NavigationUnauth className={styles.menuNav} />
          <div className={styles.menuButtons}>
            <HeaderAuthButtons />
            <div className={styles.tabletMenuLogin}>
              <HeaderAuthButtons showJoin={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
