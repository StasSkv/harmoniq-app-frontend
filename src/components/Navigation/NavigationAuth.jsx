import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export const NavigationAuth = () => {
  const getLinkClassName = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end className={getLinkClassName}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles" className={getLinkClassName}>
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink to="/authors" className={getLinkClassName}>
            Creators
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={getLinkClassName}>
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
