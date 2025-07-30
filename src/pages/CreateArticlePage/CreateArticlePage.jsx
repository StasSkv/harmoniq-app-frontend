import s from './CreateArticlePage.module.css';
import { Container } from '../../components/Container/Container';
import { AddArticleForm } from '../../components/AddArticleForm/AddArticleForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../redux/articlesSlice/articlesOperation';
import { selectCurrentArticle } from '../../redux/articlesSlice/articlesSelectors';

export const CreateArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [articleId, dispatch]);

  return (
    <section className={s.createArticlePage}>
      <Container className={s.container}>
        <h2 className={s.title}>{article ? 'Edit article' : 'Create an article'}</h2>
        <AddArticleForm article={article} />
      </Container>
    </section>
  );
};
