import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../redux/auth/operations';
import { clearRegistrationData } from '../../redux/auth/registrationSlice';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

import s from './UploadForm.module.css';

const UploadPhotoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password } = useSelector((state) => state.registration);
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required('Photo is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', values.photo);

      try {
        await dispatch(registerThunk(formData)).unwrap();
        dispatch(clearRegistrationData());
        navigate('/');
      } catch (error) {
        toast.error('Помилка реєстрації: ' + error.message);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue('photo', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <h3 className={s.title}>Upload your photo</h3>

      <div className={s.avatarWrapper}>
        <label htmlFor="photo" className={s.avatarLabel}>
          {preview ? (
            <img src={preview} alt="Preview" className={s.avatarImage} />
          ) : (
            <svg width="24" height="24">
              <use href="../../assets/icons/sprite.svg#icon-user" />
            </svg>
          )}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          name="photo"
          onChange={handleFileChange}
          className={s.inputHidden}
        />
      </div>

      {formik.touched.photo && formik.errors.photo && (
        <div className={s.error}>{formik.errors.photo}</div>
      )}

      <button type="submit" className={s.submitBtn}>
        Save
      </button>
    </form>
  );
};

export default UploadPhotoForm;
