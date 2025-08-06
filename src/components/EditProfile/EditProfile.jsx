import s from './EditProfile.module.css';
import clsx from 'clsx';
import * as Yup from 'yup';

import sprite from '../../assets/icons/sprite.svg';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from '../Loader/Loader';
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserInfo } from '../../redux/usersSlice/usersOperations';
import { selectIsLoading } from '../../redux/usersSlice/usersSelectors';

const EditProfile = ({ isOpen, userInfo, onClose }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [avatarChange, setAvatarChange] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(userInfo.avatar);

  const isLoading = useSelector(selectIsLoading);

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
    if (avatarChange && avatar instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(avatar);
    } else if (!avatarChange) {
      setPreviewUrl(userInfo.avatar);
    }
  }, [avatar, avatarChange, userInfo.avatar]);

  const initialValues = {
    name: userInfo.name,
    avatar: null,
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     setAvatarChange(true);
  //     setAvatar(file);
  //   }
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 3 characters long')
      .max(20, 'Name must be less than 20 characters long'),
    avatar: Yup.mixed()
      .nullable()
      .test('fileSize', 'File is too large (max 1MB)', (value) => {
        return !value || (value && value.size <= 1024 * 1024);
      })
      .test('fileType', 'Unsupported file format', (value) => {
        return (
          !value || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
        );
      }),
  });

  const handleSubmit = async (values) => {
    const updatedFields = {};
    if (values.name !== userInfo.name) {
      updatedFields.name = values.name;
    }
    if (avatarChange && avatar instanceof File) {
      updatedFields.avatar = avatar;
    }
    if (Object.keys(updatedFields).length > 0) {
      try {
        await dispatch(updateUserInfo(updatedFields));
        onClose();
      } catch (err) {
        toast.error('Failed to update user info, try again later');
        return err;
      }
    } else {
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
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
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className={s.inputPhoto}
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      setAvatarChange(true);
                      setAvatar(file);
                      setFieldValue('avatar', file);
                    }
                  }}
                />
                <ErrorMessage name="avatar" component="span" className={s.errorMessage} />
                <div
                  className={clsx(s.photoPlaceholderWrapper, {
                    [s.photoPlaceholderWrapperNewPhoto]: avatarChange,
                  })}
                >
                  <img
                    src={previewUrl}
                    alt="avatar"
                    className={clsx(s.photoPlaceholder, {
                      [s.photoPlaceholderNewPhoto]: avatarChange,
                    })}
                    width={160}
                    height={160}
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={clsx(s.photoIcon, { [s.photoIconNewPhoto]: avatarChange })}
                  >
                    <use href={`${sprite}#icon-chenge-photo`} />
                  </svg>
                </div>
              </div>

              <button type="submit" className={s.btn}>
                {isLoading ? <Loader className={s.loader} size={28} /> : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default EditProfile;
