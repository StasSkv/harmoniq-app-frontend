import React from 'react';
import AuthorItem from '../AuthorItem/AuthorItem';
import s from './AuthorList.module.css';

const AuthorsList = ({ authors }) => {
  if (!authors.length) {
    return <p className={s.placeholder}>No authors available.</p>;
  }

  return (
    <ul className={s.authorsList}>
      {authors.map(({ _id, name, avatar }) => (
        <AuthorItem key={_id} id={_id} name={name} avatar={avatar} />
      ))}
    </ul>
  );
};

export default AuthorsList;
