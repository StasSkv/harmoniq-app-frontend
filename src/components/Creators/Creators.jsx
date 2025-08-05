import { Link } from 'react-router-dom';
import s from './Creators.module.css';
import sprite from '../../assets/icons/sprite.svg';
import { Container } from '../Container/Container';
import { Loader } from '../Loader/Loader';

export const Creators = ({ authors }) => {
  return (
    <section className={s.creators}>
      {!authors?.length ? (
        <Loader />
      ) : (
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
            {authors?.map(({ id, name, avatar }) => (
              <li key={id} className={s.authorsListItem}>
                <Link to={`/authors/${id}`} className={s.linkItem}>
                  <img src={avatar} alt={name} className={s.image} />
                  <p className={s.name}>{name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
};
