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

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        alert('Please log in first.');
        return;
      }

      await axios.post(`http://localhost:3000/users/save/${currentArticle._id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('Article saved to bookmarks!');
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Failed to save');
    }
  };

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
                  <h4 className={s.recommendArticleTitle}>{article.title}</h4>
                  <p className={s.recommendAuthor}>By {article.author?.name || 'Unknown'}</p>
                </div>
                <Link to={`/articles/${article._id}`} className={s.linkBtn}>
                  <svg className={s.iconRight} width="25" height="24">
                    <use href="/src/assets/icons/sprite.svg#icon-arrow-right" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className={s.saveBtn} onClick={handleSave}>
        <svg className={s.iconSave} width="25" height="25">
          <use href="/src/assets/icons/sprite.svg#icon-save" />
        </svg>
        Save
      </button>
    </>
  );
};

export default RecommendedArticles;
