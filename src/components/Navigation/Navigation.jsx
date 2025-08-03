import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/authSlice/authSelectors';
import s from './Navigation.module.css';

export const Navigation = ({ onLinkClick }) => {
  const isAuth = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/articles', label: 'Articles', end: true },
    { to: '/authors', label: 'Authors', end: true },
    ...(isAuth ? [{ to: `/authors/${user._id}`, label: 'My Profile', end: true }] : []),
  ];

  return (
    <nav>
      <ul className={s.list}>
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              strict
              className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)}
              onClick={onLinkClick}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
