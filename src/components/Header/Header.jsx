import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import HeaderAuthButtons from '../HeaderAuthButtons/HeaderAuthButtons';
import UserMenu from '../UserMenu/UserMenu';
import { motion, useAnimation } from 'framer-motion';
import s from './Header.module.css';
import sprite from '../../assets/icons/sprite.svg';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      controls.start('exit');
    } else {
      controls.start('enter');
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1440;

  const menuVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    controls.start('exit');
  };

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

      <motion.div
        className={s.menu}
        variants={menuVariants}
        initial="exit"
        animate={controls}
        exit="exit"
      >
        <Navigation className={s.menuNav} onLinkClick={handleLinkClick} />
        <div className={s.menuButtons}>
          {isLoggedIn ? (
            <UserMenu showCreate={!isTablet} showName showExit onLinkClick={handleLinkClick} />
          ) : (
            <HeaderAuthButtons showJoin={!isTablet} onLinkClick={handleLinkClick} />
          )}
        </div>
      </motion.div>
    </header>
  );
};
