import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors';
import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import HeaderAuthButtons from '../HeaderAuthButtons/HeaderAuthButtons';
import UserMenu from '../UserMenu/UserMenu';
//eslint-disable-next-line
import { motion, useAnimation } from 'framer-motion';
import s from './Header.module.css';
import sprite from '../../assets/icons/sprite.svg';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useAnimation();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (menuOpen) {
      controls.start('exit');
    } else {
      controls.start('enter');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    controls.start('exit');
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (menuOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
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
    closeMenu();
  };

  const handleLogoutCloseMenu = () => {
    closeMenu();
  };

  return (
    <header className={`${s.header} ${showHeader ? s['header-visible'] : s['header-hidden']}`}>
      <Container className={s.container}>
        <a href="/" className={s.logo}>
          <svg width="165" height="46">
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </a>

        <div className={s.desktopNav}>
          <Navigation />
          {isLoggedIn ? (
            <UserMenu onLogoutCloseMenu={handleLogoutCloseMenu} />
          ) : (
            <HeaderAuthButtons />
          )}
        </div>

        <div className={s.tabletArea}>
          {isLoggedIn ? (
            <UserMenu
              showName={false}
              showExit={false}
              onLogoutCloseMenu={handleLogoutCloseMenu}
              onCloseMenu={closeMenu}
            />
          ) : (
            <HeaderAuthButtons showLogin={false} onLinkClick={closeMenu} />
          )}
          <button className={s.burger} onClick={toggleMenu} aria-label="Toggle menu">
            <svg width="32" height="32">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div>

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
        onClick={closeMenu}
      >
        <Navigation className={s.menuNav} onLinkClick={handleLinkClick} />
        <div className={s.menuButtons}>
          {isLoggedIn ? (
            <UserMenu
              showCreate={!isTablet}
              showName
              showExit
              onLinkClick={handleLinkClick}
              onCloseMenu={closeMenu}
              onLogoutCloseMenu={handleLogoutCloseMenu}
            />
          ) : (
            <HeaderAuthButtons showJoin={!isTablet} onLinkClick={handleLinkClick} />
          )}
        </div>
      </motion.div>
    </header>
  );
};
