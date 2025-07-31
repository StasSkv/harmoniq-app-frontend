import { useSelector } from 'react-redux';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import s from './ArticlesList.module.css';
import { selectArticles } from '../../redux/articlesSlice/articlesSelectors';

const ArticlesList = ({ firstNewItemRef, page, limit }, ref) => {
  const articles = useSelector(selectArticles);

  return (
    <>
      <div className={s.articles_list_wrapper}>
        <ul className={s.articles_list} ref={ref}>
          {articles.map(({ _id, img, title, article, ownerName }, index) => {
            const isFirstNewItem = page > 1 && index === (page - 1) * limit;

            return (
              <li
                key={_id}
                className={s.articles_list_item}
                ref={isFirstNewItem ? firstNewItemRef : null}
              >
                <ArticleItem
                  articleId={_id}
                  img={img}
                  title={title}
                  article={article}
                  ownerName={ownerName}
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
