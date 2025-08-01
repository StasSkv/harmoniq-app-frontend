import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerThunk } from '../../redux/authSlice/authOperations';
import sprite from '../../assets/icons/sprite.svg';
import { clearRegistrationData } from '../../redux/authSlice/registrationSlice';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import s from './UploadForm.module.css';
import { Container } from '../Container/Container';
import { setLoading } from '../../redux/globalSlice/globalSlice';
import { selectIsLoading } from '../../redux/globalSlice/globalSelectors';
import { LoaderPage } from '../Loader/LoaderPage/LoaderPage';
import {
  selectRegistrationEmail,
  selectRegistrationName,
  selectRegistrationPassword,
} from '../../redux/authSlice/authSelectors';

const UploadPhotoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectRegistrationName);
  const email = useSelector(selectRegistrationEmail);
  const password = useSelector(selectRegistrationPassword);
  const isLoading = useSelector(selectIsLoading);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!name || !email || !password) {
      navigate('/register');
    }
  }, [name, email, password, navigate]);

  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema: Yup.object({
      photo: Yup.mixed()
        .required('Photo is required')
        .test(
          'fileSize',
          'File is too large (max 1MB)',
          (value) => !value || value.size <= 1024 * 1024
        )
        .test(
          'fileType',
          'Unsupported file format',
          (value) =>
            !value || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
        ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', values.photo);

      dispatch(setLoading(true));
      try {
        await dispatch(registerThunk(formData)).unwrap();
        dispatch(clearRegistrationData());
        navigate('/');
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Unknown error';
        toast.error(`Registration failed: ${message}`);

        dispatch(clearRegistrationData());
        navigate('/register');
      } finally {
        dispatch(setLoading(false));
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

  const handleClose = () => {
    dispatch(clearRegistrationData());
    navigate('/');
  };

  if (isLoading) return <LoaderPage />;

  return (
    <Container className={s.container}>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <h3 className={s.title}>Upload your photo</h3>
        <button type="button" className={s.closeButton} onClick={handleClose}>
          <svg className={s.buttonIcon} width="24" height="24">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <div className={s.avatarWrapper}>
          <label htmlFor="photo" className={s.avatarLabel}>
            {preview ? (
              <img src={preview} alt="Preview" className={s.avatarImage} />
            ) : (
              <svg className={s.cameraIcon} width="116" height="97">
                <use href={`${sprite}#icon-camera`} />
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
