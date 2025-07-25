import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import AuthorItem from '../AuthorItem/AuthorItem.jsx';

const Creators = () => {
  const [creators, setCreators] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    //     const fetchCreators = async () => {
    //       try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/top-creators`);
    //         const data = await response.json();
    //         setCreators(data);
    //       } catch (error) {
    //         console.error('Ошибка при загрузке топ авторов:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchCreators();
    //   }, []);

    const mockData = [
      {
        id: 1,
        name: 'Jane Doe',
        imageUrl: 'https://placehold.co/100?text=JD',
      },
      {
        id: 2,
        name: 'John Smith',
        imageUrl: 'https://placehold.co/100?text=JS',
      },
      {
        id: 3,
        name: 'Alice Johnson',
        imageUrl: 'https://placehold.co/100?text=AJ',
      },
      {
        id: 4,
        name: 'Bob Lee',
        imageUrl: 'https://placehold.co/100?text=BL',
      },
      {
        id: 5,
        name: 'Emily White',
        imageUrl: 'https://placehold.co/100?text=EW',
      },
      {
        id: 6,
        name: 'Chris Black',
        imageUrl: 'https://placehold.co/100?text=CB',
      },
    ];

    setCreators(mockData);
    // setLoading(false);
  }, []);
  console.log('creators:', creators);
  return (
    <section className={s.creators}>
      <div className={s.header}>
        <h2 className={s.title}>Top Creators</h2>
        <Link to="/CreatorsPage" className={s.link}>
          Go to all Creators
        </Link>
      </div>

      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
      <ul className={s.creatorsList}>
        {creators.slice(0, 6).map((creator) => (
          <AuthorItem key={creator.id} name={creator.name} imageUrl={creator.imageUrl} />
        ))}
      </ul>
      {/* )} */}
    </section>
  );
};

export default Creators;
