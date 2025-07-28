import s from './Loyout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header.jsx';
import { Footer } from '../Footer/Footer.jsx';

export const Layout = () => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
