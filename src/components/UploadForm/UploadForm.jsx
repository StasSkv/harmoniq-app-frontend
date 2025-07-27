import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../redux/auth/operations';
import sprite from '../../assets/icons/sprite.svg';
import { clearRegistrationData } from '../../redux/auth/registrationSlice';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import s from './UploadForm.module.css';
import { Container } from '../Container/Container';

const UploadPhotoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password } = useSelector((state) => state.registration);
  const [preview, setPreview] = useState(null);

  console.log(name);
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
        console.log(formData);
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
    <Container>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <h3 className={s.title}>Upload your photo</h3>

        <div className={s.avatarWrapper}>
          <label htmlFor="photo" className={s.avatarLabel}>
            {preview ? (
              <img src={preview} alt="Preview" className={s.avatarImage} />
            ) : (
              <svg className={s.cameraIcon} width="60" height="60">
                <use href={`${sprite}#icon-user`} />
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

        <button type="submit" className={s.submitBtn} disabled={!formik.values.photo}>
          Save
        </button>
      </form>
    </Container>
  );
};

export default UploadPhotoForm;
