import React from 'react';
import s from './AuthorItem.module.css';
import { Link } from 'react-router-dom';

const AuthorItem = ({ id, name, avatar }) => {
  return (
    <li className={s.card}>
      <Link to={`/AuthorProfilePage/${id}`} className={s.link}>
        <img src={avatar} alt={name} className={s.image} />
        <p className={s.name}>{name}</p>
      </Link>
    </li>
  );
};

export default AuthorItem;
