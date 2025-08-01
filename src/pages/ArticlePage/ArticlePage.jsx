import s from './ArticlePage.module.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../redux/articlesSlice/articlesOperation';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage';
import { Container } from '../../components/Container/Container';
import DOMPurify from 'dompurify';
import {
  selectCurrentArticle,
  selectError,
  selectIsLoading,
} from '../../redux/articlesSlice/articlesSelectors';
import { fetchAllArticles } from '../../redux/articlesSlice/articlesOperation';
import { selectAllArticles } from '../../redux/articlesSlice/articlesSelectors';

const ArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const recommendedArticles = useSelector(selectAllArticles);
  const currentArticle = useSelector(selectCurrentArticle);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  console.log(recommendedArticles.data);

  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);
  const article = currentArticle?.data || currentArticle;

  useEffect(() => {
    dispatch(fetchAllArticles({ filter: 'popular', limit: 3 }));
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (isLoading) return <LoaderPage />;
  if (error) return <p>Помилка: {error}</p>;
  if (!article) return <p>Статтю не знайдено</p>;

  return (
    <article className={s.articlePage}>
      <Container>
        <h2 className={s.articleTitle}>{article.title}</h2>
        {article.img && <img src={article.img} alt={article.title} className={s.articleImg} />}
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
          </div>
          <div className={s.future}>You can also interested</div>
        </div>
      </Container>
    </article>
  );
};

export default ArticlePage;
