import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginThunk } from '../../redux/auth/authOperations';
import { useNavigate } from 'react-router-dom';
import { Container } from '../Container/Container';
import s from './LoginForm.module.css';
import { ToggleBtn } from '../ToggleBtn/ToggleBtn';

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').max(64, 'Too Long!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(64, 'Too Long!').required('Required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(loginThunk(values)).unwrap();
      navigate('/');
      actions.resetForm();
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Unknown error';
      toast.error(`Login failed: ${message}`);
    }
  };

  return (
    <Container className={s.container}>
      <div className={s.loginWrapper}>
        <h2 className={s.loginTitle}>Login</h2>
        <div className={s.loginBody}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form className={s.form}>
              <fieldset className={s.fieldset}>
                <label className={s.loginLabel}>Enter you email address</label>
                <Field name="email">
                  {({ field, meta }) => (
                    <div className={s.emailField}>
                      <input
                        {...field}
                        type="email"
                        placeholder="email@gmail.com"
                        className={`${s.input} ${meta.touched && meta.error ? s.inputError : ''}`}
                      />
                      <ErrorMessage name="email" component="span" className={s.errorMessage} />
                    </div>
                  )}
                </Field>
                <label className={s.loginLabel}>Enter a password</label>
                <Field name="password">
                  {({ field, meta }) => (
                    <div className={s.passwordField}>
                      <input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className={`${s.input} ${meta.touched && meta.error ? s.inputError : ''}`}
                        placeholder="Password"
                      />
                      <ToggleBtn
                        isShown={showPassword}
                        onClick={() => setShowPassword((p) => !p)}
                      />
                      <ErrorMessage name="password" component="span" className={s.errorMessage} />
                    </div>
                  )}
                </Field>

                <button type="submit" className={s.btn}>
                  Login
                </button>
                <Link to="/register" className={s.link}>
                  Don't have an account? <span className={s.span}>Register!</span>
                </Link>
              </fieldset>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};
