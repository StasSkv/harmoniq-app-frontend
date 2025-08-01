import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setStepOneData } from '../../redux/authSlice/registrationSlice';
import { ToggleBtn } from '../ToggleBtn/ToggleBtn';
import css from './RegisterForm.module.css';
import { Container } from '../Container/Container';
import { setLoading } from '../../redux/globalSlice/globalSlice';
import { selectIsLoading } from '../../redux/globalSlice/globalSelectors';
import { LoaderPage } from '../Loader/LoaderPage/LoaderPage';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short!').max(32, 'Too long!').required('Required'),
  email: Yup.string().email('Invalid email address').max(64, 'Too long!').required('Required'),
  password: Yup.string().min(8, 'Too short!').max(64, 'Too long!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    dispatch(setLoading(true));
    dispatch(setStepOneData(values));
    navigate('/upload-photo');
    dispatch(setLoading(false));
  };

  if (isLoading) return <LoaderPage />;

  return (
    <Container className={css.container}>
      <div className={css.loginWrapper}>
        <h2 className={css.loginTitle}>Register</h2>
        <p className={css.registerText}>Join our community of mindfulness and wellbeing!</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <fieldset className={css.fieldset}>
              <Field name="name">
                {({ field, meta }) => (
                  <div className={css.nameField}>
                    <label className={css.loginLabel}>Enter your name</label>
                    <input
                      {...field}
                      type="text"
                      placeholder="Name"
                      className={`${css.input} ${meta.touched && meta.error ? css.inputError : ''}`}
                    />
                    <ErrorMessage name="name" component="span" className={css.errorMessage} />
                  </div>
                )}
              </Field>

              <Field name="email">
                {({ field, meta }) => (
                  <div className={css.emailField}>
                    <label className={css.loginLabel}>Enter your email address</label>
                    <input
                      {...field}
                      type="email"
                      placeholder="email@example.com"
                      className={`${css.input} ${meta.touched && meta.error ? css.inputError : ''}`}
                    />
                    <ErrorMessage name="email" component="span" className={css.errorMessage} />
                  </div>
                )}
              </Field>

              <div className={css.passwordField}>
                <label className={css.loginLabel}>Create a strong password</label>
                <Field name="password">
                  {({ field, meta }) => (
                    <div style={{ position: 'relative' }}>
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className={`${css.input} ${
                          meta.touched && meta.error ? css.inputError : ''
                        }`}
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                      <ToggleBtn
                        isShown={showPassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage name="password" component="span" className={css.errorMessage} />
              </div>

              <div className={css.passwordConfirmField}>
                <label className={css.loginLabel}>Repeat your password</label>
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <div style={{ position: 'relative' }}>
                      <input
                        {...field}
                        type={showConfirm ? 'text' : 'password'}
                        className={`${css.input} ${
                          meta.touched && meta.error ? css.inputError : ''
                        }`}
                        placeholder="Repeat Password"
                        autoComplete="new-password"
                      />
                      <ToggleBtn
                        isShown={showConfirm}
                        onClick={() => setShowConfirm((prev) => !prev)}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <button type="submit" className={css.btn}>
                Create account
              </button>

              <p className={css.link}>
                Already have an account?{' '}
                <Link to="/login" className={css.span}>
                  Log in!
                </Link>
              </p>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};
