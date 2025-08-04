import s from './CreateArticlePage.module.css';
import { Container } from '../../components/Container/Container';
import { AddArticleForm } from '../../components/AddArticleForm/AddArticleForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleById } from '../../redux/articlesSlice/articlesOperation';
import { selectCurrentArticle } from '../../redux/articlesSlice/articlesSelectors';
import { selectUser } from '../../redux/authSlice/authSelectors.js';
import { toast } from 'react-toastify';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const user = useSelector(selectUser);
  const article = useSelector(selectCurrentArticle);

  useEffect(() => {
    if (!articleId) return;
    if (!article || article._id !== articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [articleId, dispatch, article]);

  const isOwner = article && article.ownerId === user._id;

  useEffect(() => {
    if (article && articleId && !isOwner) {
      navigate('/');
      toast.error('You are not authorized to edit this article');
    }
  }, [article, articleId, isOwner, navigate]);

  return (
    <section className={s.createArticlePage}>
      <Container className={s.container}>
        <h2 className={s.title}>{article ? 'Edit article' : 'Create an article'}</h2>
        <AddArticleForm article={article || null} />
      </Container>
    </section>
  );
};

export default CreateArticlePage;
