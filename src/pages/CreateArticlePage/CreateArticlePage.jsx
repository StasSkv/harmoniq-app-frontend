import s from './CreateArticlePage.module.css';
import { Container } from '../../components/Container/Container';
import { AddArticleForm } from '../../components/AddArticleForm/AddArticleForm.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { login } from '../../redux/articlesSlice/articlesOperation';

export const CreateArticlePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <section className={s.createArticlePage}>
      <Container className={s.container}>
        <h2 className={s.title}>Create an article</h2>
        <AddArticleForm />
      </Container>
    </section>
  );
};
