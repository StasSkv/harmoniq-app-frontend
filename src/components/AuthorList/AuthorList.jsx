import { AuthorItem } from '../AuthorItem/AuthorItem';
import s from './AuthorList.module.css';
import clsx from 'clsx';

export const AuthorsList = ({ authors }) => {
  if (!authors?.length) return null;
  return (
    <ul className={clsx(s.authorsList)}>
      {authors.map(({ id, name, avatar }) => (
        <li key={id} className={s.authorsListItem}>
          <AuthorItem id={id} name={name} avatar={avatar} />
        </li>
      ))}
    </ul>
  );
};
