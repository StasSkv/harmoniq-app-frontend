import s from './NothingFoundItemsInProfile.module.css';
import { Link } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';

export const NothingFoundItemsInProfile = ({
  description = 'Try to change the search query.',
  link = '/',
  linkText = 'Go to home',
}) => {
  return (
    <div className={s.container}>
      <span className={s.iconWrapper}>
        <svg width="46" height="40" className={s.icon}>
          <use href={`${sprite}#icon-alert`} />
        </svg>
      </span>
      <p className={s.title}>Nothing found.</p>
      <p className={s.description}>{description}</p>
      <Link to={`/${link}`} className={s.link}>
        {linkText}
      </Link>
    </div>
  );
};
