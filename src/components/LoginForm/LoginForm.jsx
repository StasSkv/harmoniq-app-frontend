import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginThunk } from '../../redux/auth/operations';
import s from './LoginForm.module.css';

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').max(64, 'Too Long!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(64, 'Too Long!').required('Required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(loginThunk(values).unwrup());
      actions.resetForm();
    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password. Please, try again.');
    }
  };

  return (
    <div>
      <div>
        <h3>Login</h3>
      </div>
      <div className={s.cardBody}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form>
            <fieldset className={s.fieldset}>
              <label>Enter you email address</label>
              <Field type="email" name="email" className={s.input} placeholder="email@gmail.com" />
              <ErrorMessage name="email" component="span" className={s.errorMessage} />
              <label>Enter a password</label>
              <Field name="password">
                {({ field }) => (
                  <div className={s.passwordField}>
                    <input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className={s.input}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={s.toggleBtn}
                    >
                      {showPassword ? (
                        <svg width="24" height="24">
                          <use href="../../assets/icons/sprite.svg#icon-eye-crossed" />
                        </svg>
                      ) : (
                        <svg width="24" height="24">
                          <use href="../../assets/icons/sprite.svg#icon-eye" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </Field>
              <ErrorMessage name="password" component="span" className={s.errorMessage} />

              <button type="submit" className={s.btn}>
                Login
              </button>
              <div>
                <p>Don't have an account? </p>
                <Link to="/registerPage" className={s.link}>
                  Register!
                </Link>
              </div>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
