import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const NavigationUnauth = () => {
  const getLinkClassName = ({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link);

  return (
    <nav>
      <ul className={s.list}>
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
      </ul>
    </nav>
  );
};
export default NavigationUnauth;
