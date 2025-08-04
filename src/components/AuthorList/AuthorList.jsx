import { AuthorItem } from '../AuthorItem/AuthorItem';
import s from './AuthorList.module.css';
import clsx from 'clsx';

export const AuthorsList = ({ authors }) => {
  if (!authors?.length) return null;
  return (
    <ul className={clsx(s.authorsList)}>
      {authors.map((author) => {
        const id = author.id || author._id;
        const { name, avatar } = author;

        return (
          <li key={id} className={s.authorsListItem}>
            <AuthorItem id={id} name={name} avatar={avatar} />
          </li>
        );
      })}
    </ul>
  );
};
