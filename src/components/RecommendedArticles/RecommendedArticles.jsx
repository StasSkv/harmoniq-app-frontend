import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import s from './RecommendedArticles.module.css';

const RecommendedArticles = ({ currentArticle }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/articles');
        const allArticles = res.data.data;
        const shuffled = allArticles.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRecommended(selected);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.articleInfo}>
          <p>Author: {currentArticle?.author?.name || 'Unknown'}</p>
          <p>Publication date: {new Date(currentArticle?.createdAt).toLocaleDateString('en-GB')}</p>
        </div>

        <h3 className={s.title}>You can also be interested</h3>

        <div className={s.recommendationBox}>
          <ul className={s.list}>
            {recommended.map((article) => (
              <li key={article._id} className={s.item}>
                <div>
                  <h4 className={s.articleTitle}>{article.title}</h4>
                  <p className={s.author}>By {article.author?.name || 'Unknown'}</p>
                </div>
                <Link to={`/articles/${article._id}`} className={s.linkBtn}>
                  <svg className={s.icon} width="25" height="24">
                    <use href="/sprite.svg#icon-arrow-right" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={s.saveWrapper}>
        <button className={s.saveBtn}>Save</button>
      </div>
    </>
  );
};

export default RecommendedArticles;
