import s from './ButtonAddToBookmarks.module.css';
import sprite from '../../assets/icons/sprite.svg';

const ButtonAddToBookmarks = () => {
  return (
    <button className={s.addBtn} type="button">
      <svg className={s.addIcon} width="24px" height="24px">
        <use href={`${sprite}#icon-bookmark-alternative`}></use>
      </svg>
    </button>
  );
};
export default ButtonAddToBookmarks;
