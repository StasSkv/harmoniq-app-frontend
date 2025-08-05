import { ArticleItem } from '../ArticleItem/ArticleItem';
import s from './ArticlesList.module.css';

const ArticlesList = ({ articles }) => {
  return (
    <>
      <div className={s.articles_list_wrapper}>
        <ul className={s.articles_list}>
          {articles.map(({ _id, img, title, article, ownerName, ownerId }) => {
            return (
              <li key={_id} className={`${s.articles_list_item} article-item`}>
                <ArticleItem
                  articleId={_id}
                  img={img}
                  title={title}
                  article={article}
                  ownerName={ownerName}
                  ownerId={ownerId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ArticlesList;
