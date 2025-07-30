import s from './PopularArticles.module.css';
import { Container } from '../Container/Container';
import ArticleItem from '../ArticleItem/ArticleItem.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectArticles,
  selectError,
  selectIsLoading,
} from '../../redux/articlesSlice/articlesSelectors.js';

const PopularArticles = () => {
  const articlesPromslise = useSelector(selectArticles);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [visibleCount, setVisibleCount] = useState(4);
  const articles = articlesPromslise || [];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setVisibleCount(width >= 1440 ? 3 : 4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={s.section} id="popular-articles">
      <Container>
        <div className={s.header}>
          <h2 className={s.title}>Popular Articles</h2>
          <div className={s.allArticlesLinkContainer}>
            <a href="/articles" className={s.allArticlesLink}>
              <span>Go to all Articles</span>
              <svg className={s.arrorIcon}>
                <use href="/src/assets/icons/sprite.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
        <ul className={s.articlesList}>
          {loading && <span>Loading articles ...</span>}
          //{' '}
          {error ? (
            <span>Server error. Please check later</span>
          ) : (
            articles.slice(0, visibleCount).map(({ _id, img, title, article }) => (
              <li key={_id}>
                <ArticleItem img={img} title={title} article={article} />
              </li>
            ))
          )}
        </ul>
      </Container>
    </section>
  );
};
export default PopularArticles;
