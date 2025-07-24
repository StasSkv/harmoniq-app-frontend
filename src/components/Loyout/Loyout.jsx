import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
