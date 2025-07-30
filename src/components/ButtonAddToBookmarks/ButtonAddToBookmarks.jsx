import s from './ButtonAddToBookmarks.module.css';

const ButtonAddToBookmarks = () => {
  return (
    <button className={s.addBtn} type="button">
      <svg className={s.addIcon} width="24px" height="24px">
        <use href="/src/assets/icons/sprite.svg#icon-bookmark-alternative"></use>
      </svg>
    </button>
  );
};
export default ButtonAddToBookmarks;
