import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors';
import s from './Navigation.module.css';

export const Navigation = ({ onLinkClick }) => {
  const isAuth = useSelector(selectIsLoggedIn);

  const getClass = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/articles', label: 'Articles' },
    { to: '/authors', label: 'Creators' },
    ...(isAuth ? [{ to: '/profile', label: 'My Profile' }] : []),
  ];

  return (
    <nav>
      <ul className={s.list}>
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={getClass} onClick={onLinkClick}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
