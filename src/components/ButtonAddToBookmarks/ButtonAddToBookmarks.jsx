import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import s from './ButtonAddToBookmarks.module.css';
import { selectSavedArticles, selectSaveLoading } from '../../redux/usersSlice/usersSelectors.js';
import { removeSavedArticle, saveArticle } from '../../redux/usersSlice/usersOperations.js';
import { Loader } from '../Loader/Loader.jsx';
import sprite from '../../assets/icons/sprite.svg';
import { selectIsLoggedIn, selectUser } from '../../redux/authSlice/authSelectors.js';
import ModalError from '../ModalErrorSave/ModalErrorSave.jsx';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const ButtonAddToBookmarks = ({ articleId, ownerId }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const savedArticles = useSelector(selectSavedArticles);
  const isSaved = savedArticles.includes(articleId);
  const loading = useSelector(selectSaveLoading(articleId));
  const user = useSelector(selectUser);
  const isOwner = user && ownerId === user._id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isSaved) {
        await dispatch(removeSavedArticle(articleId)).unwrap();
      } else {
        await dispatch(saveArticle(articleId)).unwrap();
      }
    } catch (error) {
      toast.error('Failed to update saved articles. Please try again later.');
      console.error('Article processing error:', error);
    }
  };

  return (
    <>
      {isOwner ? (
        <Link to={`/create/${articleId}`} className={s.addBtn}>
          <svg className={s.editIcon} width="24px" height="24px">
            <use href={`${sprite}#icon-edit-article`} />
          </svg>
        </Link>
      ) : (
        <button
          className={clsx(s.addBtn, { [s.addBtnActive]: isSaved })}
          type="button"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <Loader className={s.loader} size="24" />
          ) : (
            <svg className={s.addIcon} width="24px" height="24px">
              <use href={`${sprite}#icon-bookmark-alternative`} />
            </svg>
          )}
        </button>
      )}

      <ModalError isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ButtonAddToBookmarks;
