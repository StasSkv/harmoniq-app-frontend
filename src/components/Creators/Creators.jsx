import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import { AuthorItem } from '../AuthorItem/AuthorItem.jsx';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../redux/users/usersSelectors';

export const Creators = () => {
  const creators = useSelector(selectAllUsers);

  return (
    <section className={s.creators}>
      <Container className={s.container}>
        <div className={s.header}>
          <h2 className={s.title}>Top Authors</h2>
          <Link to="/authors" className={s.link}>
            Go to all Authors
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
            <li key={creator.id} className={s.item}>
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
