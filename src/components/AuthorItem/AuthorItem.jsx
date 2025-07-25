import React from 'react';
import s from './AuthorItem.module.css';

const AuthorItem = ({ name, imageUrl }) => {
  return (
    <li className={s.card}>
      <img src={imageUrl} alt={name} className={s.image} />
      <p className={s.name}>{name}</p>
    </li>
  );
};

export default AuthorItem;
