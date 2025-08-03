import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import css from './AuthorProfilePage.module.css';
import axios from '../../redux/services/axios';
import { LoaderPage } from '../../components/Loader/LoaderPage/LoaderPage';

const AuthorProfilePage = () => {
  const { authorId } = useParams(); // отримаєш ID з маршруту
  const user = useSelector(state => state.auth.user);

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Порівнюй з _id, а не id
  const isOwnProfile = user?._id === authorId;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/users/${authorId}`);
        setAuthor(data);
      } catch (error) {
        console.error('❌ Failed to fetch author:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  if (isLoading) return <LoaderPage />;
  if (!author) return <p>❌ Author not found.</p>;

  return (
    <section className={css.wrapper}>
      <div className={css.header}>
        <img
          src={author.avatar}
          alt="Author Avatar"
          className={css.avatar}
        />
        <div className={css.info}>
          <h1 className={css.name}>{author.name}</h1>
          <p className={css.articles}>
            {author.articlesAmount || 0} articles
          </p>
        </div>
      </div>

      {isOwnProfile && (
        <div className={css.tabs}>
          <button className={css.tabBtn}>My Articles</button>
          <button className={css.tabBtn}>Saved Articles</button>
        </div>
      )}
    </section>
  );
};

export default AuthorProfilePage;
