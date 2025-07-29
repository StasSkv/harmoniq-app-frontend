import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import s from './Navigation.module.css';

export const Navigation = () => {
  const isAuth = useSelector(selectIsLoggedIn);

  const getClass = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/articles', label: 'Articles' },
    { to: '/authors', label: 'Creators' },
    { to: '/profile', label: 'My Profile' },
    ...(isAuth ? [{ to: '/profile', label: 'My Profile' }] : []),
  ];

  return (
    <nav>
      <ul className={s.list}>
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={getClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
