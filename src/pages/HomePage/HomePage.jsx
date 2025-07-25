import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import Creators from "../../components/Creators/Creators";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <PopularArticles />
        <Creators />
      </main>
      <Footer />
    </>
  );
};