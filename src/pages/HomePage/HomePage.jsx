import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import PopularArticles from '../../components/PopularArticles/PopularArticles';
import Creators from '../../components/Creators/Creators';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllArticles } from '../../redux/articlesSlice/articlesOperation';

export const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
    </>
  );
};
