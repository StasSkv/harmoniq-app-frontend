import s from './AuthorItem.module.css';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const AuthorItem = ({ id, name, avatar, className }) => {
  return (
    <Link to={`/authors/${id}`} className={clsx(s.link, className)}>
      <img src={avatar} alt={name} className={s.image} />
      <p className={s.name}>{name}</p>
    </Link>
  );
};
