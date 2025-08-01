import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';
import { LoaderPage } from '../Loader/LoaderPage/LoaderPage.jsx';

export const Creators = ({ authors }) => {
  if (!authors?.length) return <LoaderPage />;
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
          {authors.map(({ _id, name, avatar }) => (
            <li key={_id} className={s.authorsListItem}>
              <Link to={`/authors/${_id}`} className={s.linkItem}>
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
