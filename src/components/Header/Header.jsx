import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors';
import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import HeaderAuthButtons from '../HeaderAuthButtons/HeaderAuthButtons';
import UserMenu from '../UserMenu/UserMenu';

import s from './Header.module.css';
import sprite from '../../assets/icons/sprite.svg';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((p) => !p);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1440;
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <a href="/" className={s.logo}>
          <svg width="165" height="46">
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </a>

        {/* десктоп */}
        <div className={s.desktopNav}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <HeaderAuthButtons />}
        </div>

        {/* планшет: кнопка + бургер */}
        <div className={s.tabletArea}>
          {isLoggedIn ? (
            <UserMenu showName={false} showExit={false} />
          ) : (
            <HeaderAuthButtons showLogin={false} />
          )}
          <button className={s.burger} onClick={toggleMenu} aria-label="Toggle menu">
            <svg width="32" height="32">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div>

        {/* моб бургер */}
        <button className={s.mobileBurger} onClick={toggleMenu} aria-label="Toggle menu">
          <svg width="32" height="32">
            <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
          </svg>
        </button>
      </Container>

      {menuOpen && (
        <div className={s.menu}>
          <Navigation className={s.menuNav} onLinkClick={() => setMenuOpen(false)} />
          <div className={s.menuButtons}>
            {isLoggedIn ? (
              <UserMenu
                showCreate={!isTablet}
                showName
                showExit
                onLinkClick={() => setMenuOpen(false)}
              />
            ) : (
              <HeaderAuthButtons showJoin={!isTablet} onLinkClick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </header>
  );
};
