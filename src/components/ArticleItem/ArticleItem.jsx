import { Link } from 'react-router-dom';
import s from './ArticleItem.module.css';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks.jsx';
import DOMPurify from 'dompurify';

export const ArticleItem = ({ img, title, article, ownerName, articleId, ownerId }) => {
  const isHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

  return (
    <div className={s.article}>
      <Link to={`/articles/${articleId}`}>
        <img src={img} alt="Article" className={s.image} />
      </Link>
      <div className={s.articleInfo}>
        <span className={s.authorName}>{ownerName}</span>
        <h3 className={s.title}>{title}</h3>

        {isHTML(article) ? (
          <div
            className={s.articlePreview}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article),
            }}
          />
        ) : (
          <p className={s.articlePreview}>{article}</p>
        )}
      </div>
      <div className={s.buttons}>
        <Link className={s.learnLink} to={`/articles/${articleId}`}>
          Learn more
        </Link>
        <ButtonAddToBookmarks articleId={articleId} ownerId={ownerId} />
      </div>
    </div>
  );
};
