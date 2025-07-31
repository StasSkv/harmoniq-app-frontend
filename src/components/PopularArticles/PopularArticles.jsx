import s from './PopularArticles.module.css';
import { Container } from '../Container/Container';
import { ArticleItem } from '../ArticleItem/ArticleItem.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectArticles, selectIsLoading } from '../../redux/articlesSlice/articlesSelectors.js';
import { Loader } from '../Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';

export const PopularArticles = () => {
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectIsLoading);
  const [visibleCount, setVisibleCount] = useState(4);

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
            <Link to="/articles" className={s.allArticlesLink}>
              <span>Go to all Articles</span>
              <svg className={s.arrorIcon}>
                <use href={`${sprite}#icon-arrow-right`}></use>
              </svg>
            </Link>
          </div>
        </div>

        <ul className={s.articlesList}>
          {loading && (
            <div className={s.loader}>
              <Loader />
            </div>
          )}
          {!loading &&
            articles.slice(0, visibleCount).map(({ _id, img, title, article, ownerName }) => (
              <li key={_id}>
                <ArticleItem
                  articleId={_id}
                  img={img}
                  title={title}
                  article={article}
                  ownerName={ownerName}
                />
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
};
