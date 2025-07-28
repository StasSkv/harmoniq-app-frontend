import sprite from '../../assets/icons/sprite.svg';
import s from './ToggleBtn.module.css';

export const ToggleBtn = ({ isShown, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={s.toggleBtn}>
      <svg width="24" height="24">
        <use href={sprite + (isShown ? '#icon-eye-crossed' : '#icon-eye')} />
      </svg>
    </button>
  );
};
