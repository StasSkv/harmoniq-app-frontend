import { Link } from 'react-router-dom';
import s from './RecommendedArticles.module.css';
import sprite from '../../assets/icons/sprite.svg';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice/authSelectors';

export const RecommendedArticles = ({ currentArticle, recommended = [], from }) => {
  const user = useSelector(selectUser);

  return (
    <div className={s.recommendedArticles}>
      <div className={s.recommendedWrapper}>
        <div className={s.articleInfo}>
          <p>Author: {currentArticle?.ownerName || 'Unknown'}</p>
          <p>Publication date: {new Date(currentArticle?.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
        <h3 className={s.recommendedTitle}>You can also be interested</h3>
        <ul className={s.recommendList}>
          {recommended.map((article) => (
            <li key={article._id} className={s.recommendItem}>
              <div className={s.recommendedItemLi}>
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
                <p className={s.recommendAuthor}>{article?.ownerName || 'Unknown'}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ButtonAddToBookmarks
        articleId={currentArticle._id}
        className={s.addBtn}
        isArticlePage={true}
        addBtnArticlePageActive={s.addBtnArticlePageActive}
        ownerId={currentArticle?.ownerId}
        userId={user?._id}
      />
      <Link to={from} className={s.backBtn}>
        <svg className={s.iconBack} width="20" height="20">
          <use href={`${sprite}#icon-arrow-left`} />
        </svg>
        Back to articles
      </Link>
    </div>
  );
};
