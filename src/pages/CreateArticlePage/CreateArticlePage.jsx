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
      return;
    }
    if (user._id !== article.ownerId) {
      navigate('/');
      toast.error('You are not authorized to edit this article');
    }
  }, [articleId, dispatch, article, user, navigate]);

  return (
    <section className={s.createArticlePage}>
      <Container className={s.container}>
        <h2 className={s.title}>{article ? 'Edit article' : 'Create an article'}</h2>
        <AddArticleForm article={article} />
      </Container>
    </section>
  );
};

export default CreateArticlePage;
