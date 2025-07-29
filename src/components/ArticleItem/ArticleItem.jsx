import { Link } from 'react-router-dom';
import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks.jsx';

const ArticleItem = ({ img, title, article, ownerName }) => {
  return (
    <div className={s.article}>
      <img src={img} alt="Article" className={s.image} />
      <div>
        <span className={s.authorName}>{ownerName}</span>
        <h3 className={s.title}>{title}</h3>
        <p className={s.articlePreview}>{article}</p>
      </div>
      <div className={s.buttons}>
        <Link className={s.learnLink} to="articlePage">
          Learn more
        </Link>
        <ButtonAddToBookmarks />
      </div>
    </div>
  );
};
export default ArticleItem;
