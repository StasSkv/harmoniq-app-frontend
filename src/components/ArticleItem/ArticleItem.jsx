import { Link } from 'react-router-dom';
import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks.jsx';

export const ArticleItem = ({ img, title, article, ownerName, articleId }) => {
  return (
    <div className={s.article}>
      <img src={img} alt="Article" className={s.image} />
      <div className={s.articleInfoWrapper}>
        <div className={s.articleInfo}>
          <span className={s.authorName}>{ownerName}</span>
          <h3 className={s.title}>{title}</h3>
          <p className={s.articlePreview}>{article}</p>
        </div>
      </div>
      <div className={s.buttons}>
        <Link className={s.learnLink} to={`/articles/${articleId}`}>
          Learn more
        </Link>
        <ButtonAddToBookmarks articleId={articleId} />
      </div>
    </div>
  );
};
