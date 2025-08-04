import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';
import { LoaderPage } from '../Loader/LoaderPage/LoaderPage.jsx';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../redux/usersSlice/usersSelectors.js';

export const Creators = ({ authors }) => {
  const creatorsFromRedux = useSelector(selectAllUsers);
  const creatorsRaw = authors || creatorsFromRedux;
  const creators = Array.isArray(creatorsRaw) ? creatorsRaw : [];
  if (!creators.length) return <LoaderPage />;

  return (
    <section className={s.creators}>
      <Container className={s.container}>
        <div className={s.header}>
          <h2 className={s.title}>Top Authors</h2>
          <Link to="/authors" className={s.link}>
            Go to all Authors
            <svg className={s.icon}>
              <use href={`${sprite}#icon-arrow-right`} />
            </svg>
          </Link>
        </div>
        <ul className={s.authorsList}>
          {authors.map(({ id, name, avatar }) => (
            <li key={id} className={s.authorsListItem}>
              <Link to={`/authors/${id}`} className={s.linkItem}>
                <img src={avatar} alt={name} className={s.image} />
                <p className={s.name}>{name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
