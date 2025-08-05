import s from './ArticlePage.module.css';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchArticleById,
  deleteArticle,
  fetchAllArticles,
  fetchArticlesWithParams,
} from '../../redux/articlesSlice/articlesOperation';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage';
import { Container } from '../../components/Container/Container';
import DOMPurify from 'dompurify';
import {
  selectCurrentArticle,
  selectError,
  selectIsLoading,
  selectArticles,
  selectUser,
} from '../../redux/articlesSlice/articlesSelectors';
import { RecommendedArticles } from '../../components/RecommendedArticles/RecommendedArticles';

const ArticlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { articleId } = useParams();
  const dispatch = useDispatch();
  const recommended = useSelector(selectArticles);

  const currentArticle = useSelector(selectCurrentArticle);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);
  const article = currentArticle?.data || currentArticle;

  const user = useSelector(selectUser);
  const from = location.state?.from || '/articles?page=1&filter=all';
  const urlParams = new URLSearchParams(from.split('?')[1]);
  const page = Number(urlParams.get('page')) || 1;
  const filter = urlParams.get('filter') || 'all';

  useEffect(() => {
    dispatch(fetchAllArticles({ filter: 'popular', limit: 3 }));
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (isLoading) return <LoaderPage />;
  if (error) return <p>Помилка: {error}</p>;
  if (!article) return <p>Статтю не знайдено</p>;

  const handleDelete = () => {
    const confirmed = window.confirm('Ви впевнені, що хочете видалити цю статтю?');
    if (confirmed) {
      dispatch(deleteArticle(articleId))
        .unwrap()
        .then(() => {
          dispatch(fetchArticlesWithParams({ page, filter, limit: 3 }));
          navigate(from);
        })
        .catch((err) => console.error('Помилка видалення:', err));
    }
  };

  return (
    <article className={s.articlePage}>
      <Container>
        <h2 className={s.articleTitle}>{article.title}</h2>
        <div className={s.articleImgWrapper}>
          {article.img && <img src={article.img} alt={article.title} className={s.articleImg} />}
        </div>
        <div className={s.content}>
          <div className={s.articleText}>
            {isHTML(article.article) ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.article),
                }}
              />
            ) : (
              article.article.split('\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            )}
            {user && article?.ownerId && user._id === article.ownerId && (
              <button onClick={handleDelete} className={s.deleteBtn}>
                Видалити статтю
              </button>
            )}
          </div>
          <RecommendedArticles currentArticle={currentArticle} recommended={recommended} />
        </div>
      </Container>
    </article>
  );
};

export default ArticlePage;
