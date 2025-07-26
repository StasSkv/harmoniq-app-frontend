import React from 'react';
import s from './AuthorItem.module.css';
import { Link } from 'react-router-dom';

const AuthorItem = ({ id, name, imageUrl }) => {
  return (
    <Link to={`/AuthorProfilePage/${id}`} className={s.link}>
      <li className={s.card}>
        <img src={imageUrl} alt={name} className={s.image} />
        <p className={s.name}>{name}</p>
      </li>
    </Link>
  );
};

export default AuthorItem;
