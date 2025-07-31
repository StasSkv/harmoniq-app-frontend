import s from './ArticlePage.module.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../redux/articlesSlice/articlesOperation';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage';
import { Container } from '../../components/Container/Container';

const ArticlePage = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const rawArticle = useSelector((state) => state.articles.currentArticle);
  const article = rawArticle?.data || rawArticle;
  const isLoading = useSelector((state) => state.articles.isLoading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
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
          <div className={s.articleText} dangerouslySetInnerHTML={{ __html: article.article }} />
          <div className={s.future}>You can also interested</div>
        </div>
      </Container>
    </article>
  );
};

export default ArticlePage;
