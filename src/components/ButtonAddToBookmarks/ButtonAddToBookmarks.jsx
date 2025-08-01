import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import s from './ButtonAddToBookmarks.module.css';
import { selectSavedArticles, selectSaveLoading } from '../../redux/usersSlice/usersSelectors.js';
import { removeSavedArticle, saveArticle } from '../../redux/usersSlice/usersOperations.js';
import { Loader } from '../Loader/Loader.jsx';
import sprite from '../../assets/icons/sprite.svg';
import { selectIsLoggedIn } from '../../redux/authSlice/authSelectors.js';
import ModalError from '../ModalErrorSave/ModalErrorSave.jsx'; // ✅ matches your actual component

const ButtonAddToBookmarks = ({ articleId }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const savedArticles = useSelector(selectSavedArticles);
  const isSaved = savedArticles.includes(articleId);
  const loading = useSelector(selectSaveLoading(articleId));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    isSaved ? dispatch(removeSavedArticle(articleId)) : dispatch(saveArticle(articleId));
  };

  return (
    <>
      <button className={s.addBtn} type="button" onClick={handleClick} disabled={loading}>
        {loading ? (
          <Loader className={s.loader} size="24" />
        ) : (
          <svg className={s.addIcon} width="24px" height="24px">
            <use
              href={isSaved ? `${sprite}#icon-remove-saved` : `${sprite}#icon-bookmark-alternative`}
            />
          </svg>
        )}
      </button>

      <ModalError isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ButtonAddToBookmarks;
