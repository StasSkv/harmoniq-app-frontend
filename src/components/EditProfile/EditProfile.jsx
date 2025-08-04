import s from './EditProfile.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import sprite from '../../assets/icons/sprite.svg';
import { useEffect } from 'react';
//eslint-disable-next-line
import { motion } from 'framer-motion';

const EditProfile = ({ isOpen, userInfo, onClose }) => {
  const handleSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const initialValues = {
    name: userInfo.name,
    avatar: userInfo.avatar,
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <motion.div
        className={s.wrapper}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <button type="button" className={s.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={s.closeButtonIcon}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <h2 className={s.title}>Edit profile info</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={s.form}>
            <div className={s.nameWrapper}>
              <label className={s.label} htmlFor="name">
                Change your name
              </label>
              <Field name="name" type="text" placeholder="Enter your name" className={s.input} />
              <ErrorMessage name="name" component="span" className={s.errorMessage} />
            </div>

            <div className={s.photoWrapper}>
              <label htmlFor="photo" className={s.photoLabel}></label>
              <Field name="photo" type="file" className={s.inputPhoto} />
              <div className={s.photoPlaceholderWrapper}>
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className={s.photoPlaceholder}
                  width={160}
                  height={160}
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={s.photoIcon}>
                  <use href={`${sprite}#icon-chenge-photo`} />
                </svg>
              </div>
            </div>

            <button type="submit" className={s.btn}>
              Save
            </button>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
};

export default EditProfile;
