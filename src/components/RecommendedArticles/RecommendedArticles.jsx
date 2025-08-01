import { Link } from 'react-router-dom';
import s from './RecommendedArticles.module.css';
import sprite from '../../assets/icons/sprite.svg';

export const RecommendedArticles = ({ currentArticle, recommended = [] }) => {
  return (
    <>
      <div className={s.recommendedWrapper}>
        <div className={s.articleInfo}>
          <p>Author: {currentArticle?.author?.name || 'Unknown'}</p>
          <p>Publication date: {new Date(currentArticle?.createdAt).toLocaleDateString('en-GB')}</p>
        </div>

        <h3 className={s.recommendedTitle}>You can also be interested</h3>

        <div className={s.recommendationBox}>
          <ul className={s.recommendList}>
            {recommended.map((article) => (
              <li key={article._id} className={s.recommendItem}>
                <div>
                  <div className={s.recommendLink}>
                    <h4 className={s.recommendArticleTitle}>{article.title}</h4>
                    <Link to={`/articles/${article._id}`} className={s.linkBtn}>
                      <span className={s.recommendSvg}>
                        <svg className={s.iconRight} width="25" height="24">
                          <use href={`${sprite}#icon-arrow-right`} />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  <p className={s.recommendAuthor}>By {article.author?.name || 'Unknown'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
