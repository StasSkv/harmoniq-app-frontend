import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import AuthorItem from '../AuthorItem/AuthorItem.jsx';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';

const Creators = () => {
  const [creators, setCreators] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const data = await response.json();
        console.log('Ответ от сервера:', data);
        setCreators(data.data);
      } catch (error) {
        console.error('Ошибка при загрузке топ авторов:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <section className={s.creators}>
      <Container className={s.container}>
        <div className={s.header}>
          <h2 className={s.title}>Top Creators</h2>
          <Link to="/CreatorsPage" className={s.link}>
            Go to all Creators
            <svg className={s.icon}>
              <use xlinkHref={`${sprite}#icon-arrow-right`} />
            </svg>
          </Link>
        </div>

        {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
        <ul className={s.creatorsList}>
          {creators.slice(0, 6).map((creator) => (
            <li key={creator.id}>
              <AuthorItem
                key={creator.id}
                id={creator.id}
                name={creator.name}
                avatar={creator.avatar}
              />
            </li>
          ))}
        </ul>
        {/* )} */}
      </Container>
    </section>
  );
};

export default Creators;
