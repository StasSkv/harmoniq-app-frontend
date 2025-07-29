// import HeaderUnauth from '../HeaderUnauth/HeaderUnauth';
// import { Container } from '../Container/Container';
// import HeaderAuth from '../HeaderAuth/HeaderAuth';
// export const Header = () => {
//   return (
//     <>
//       <HeaderUnauth />
//       <HeaderAuth />
//     </>
//   );
// };
// components/Header/Header.tsx
import { useState, useEffect } from 'react';

import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { Container } from '../Container/Container';
import { Navigation } from '../Navigation/Navigation';
import HeaderAuthButtons from '../HeaderAuthButtons/HeaderAuthButtons';
import UserMenu from '../UserMenu/UserMenu';

import styles from './Header.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { useSelector } from 'react-redux';

// export const Header = () => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => setMenuOpen((p) => !p);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? 'hidden' : '';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [menuOpen]);

//   const RightBlockDesktop = isLoggedIn ? <UserMenu /> : <HeaderAuthButtons />;
//   const RightBlockTablet = isLoggedIn ? (
//     <UserMenu showName={false} showExit={false} />
//   ) : (
//     <HeaderAuthButtons showLogin={false} />
//   );

//   return (
//     <header className={styles.header}>
//       <Container className={styles.container}>
//         <a href="/" className={styles.logo}>
//           <svg width="165" height="46">
//             <use href={`${sprite}#icon-logo`} />
//           </svg>
//         </a>

// {
/* Десктоп */
// }
// {
/* <div className={styles.desktopNav}>
          <Navigation />
          {RightBlockDesktop}
        </div> */
// }

// {
/* Планшет */
// }
// {
/* <div className={styles.tabletArea}>
          {RightBlockTablet}
          <button className={styles.burger} onClick={toggleMenu} aria-label="Toggle menu">
            <svg width="32" height="32">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div> */
// }

// {
/* Моб бургер */
// }
// {
/* <div className={styles.mobileBurger}>
          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <svg width="32" height="32">
              <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
            </svg>
          </button>
        </div>
      </Container> */
// }

// {
/* моб меню */
// }
// {
/* {menuOpen && (
        <div className={styles.menu}>
          <Navigation className={styles.menuNav} />
          <div className={styles.menuButtons}>
            {isLoggedIn ? (
              <>
                <UserMenu />
                <div className={styles.tabletMenuCreate}>
                  <UserMenu showCreate={false} />
                </div>
              </>
            ) : (
              <>
                <HeaderAuthButtons />
                <div className={styles.tabletMenuLogin}>
                  <HeaderAuthButtons showJoin={false} />
                </div>
              </>
            )}
          </div>
        </div>
      )} */
// }
// {
/* {menuOpen && (
        <div className={styles.menu}>
          <Navigation className={styles.menuNav} />
          <div className={styles.menuButtons}>
            {isLoggedIn ? <UserMenu /> : <HeaderAuthButtons />}
          </div>
        </div>
      )}
    </header>
  );
}; */
// }
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

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <a href="/" className={styles.logo}>
          <svg width="165" height="46">
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </a>

        {/* десктоп */}
        <div className={styles.desktopNav}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <HeaderAuthButtons />}
        </div>

        {/* планшет: кнопка Join + бургер */}
        {!isLoggedIn && (
          <div className={styles.tabletArea}>
            <HeaderAuthButtons showLogin={false} />
            <button className={styles.burger} onClick={toggleMenu} aria-label="Toggle menu">
              <svg width="32" height="32">
                <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
              </svg>
            </button>
          </div>
        )}

        {/* мобильный: только бургер */}
        <button className={styles.mobileBurger} onClick={toggleMenu} aria-label="Toggle menu">
          <svg width="32" height="32">
            <use href={`${sprite}#${menuOpen ? 'icon-close' : 'icon-burger'}`} />
          </svg>
        </button>
      </Container>

      {/* выпадающее меню (планшет + мобилка) */}
      {menuOpen && (
        <div className={styles.menu}>
          <Navigation className={styles.menuNav} />
          <div className={styles.menuButtons}>
            {isLoggedIn ? <UserMenu /> : <HeaderAuthButtons />}
          </div>
        </div>
      )}
    </header>
  );
};
