import { Hero } from '../../components/Hero/Hero';
import { About } from '../../components/About/About';
import { PopularArticles } from '../../components/PopularArticles/PopularArticles';
import { Creators } from '../../components/Creators/Creators';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllArticles } from '../../redux/articlesSlice/articlesOperation.js';
import { fetchAllUsers } from '../../redux/usersSlice/usersOperations.js';

export const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllArticles({ filter: 'popular', limit: 4 }));
    dispatch(fetchAllUsers({ filter: 'popular', limit: 6 }));
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
