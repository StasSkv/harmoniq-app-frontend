import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <p>Header</p>
      <NavLink to="/loginPage">Login</NavLink>
      <NavLink to="/registerPage">Register</NavLink>
    </div>
  );
};
