import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { registerThunk } from '../../redux/auth/operations';
import s from './RegisterForm.module.css';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(32, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email address').max(64, 'Too Long!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(64, 'Too Long!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(registerThunk(values).unwrap());
      actions.resetForm();
    } catch (error) {
      console.log(error);
      toast.error('A user with this email is already registered. Please, try again.');
    }
  };

  return (
    <div>
      <div>
        <h3>Register</h3>
        <p>Join our community of mindfulness and wellbeing!</p>
      </div>
      <div className={s.cardBody}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form>
            <fieldset className={s.fieldset}>
              <label>Enter you name</label>
              <Field type="name" name="name" className={s.input} placeholder="Max" />
              <ErrorMessage name="name" component="span" className={s.errorMessage} />
              <label>Enter you email address</label>
              <Field type="email" name="email" className={s.input} placeholder="email@gmail.com" />
              <ErrorMessage name="email" component="span" className={s.errorMessage} />
              <label>Create a strong password</label>
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

              <label>Repeat your password</label>
              <Field name="confirmPassword">
                {({ field }) => (
                  <div className={s.passwordField}>
                    <input
                      {...field}
                      type={showConfirm ? 'text' : 'password'}
                      className={s.input}
                      placeholder="Repeat Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className={s.toggleBtn}
                    >
                      {showConfirm ? (
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
              <ErrorMessage name="confirmPassword" component="span" className={s.errorMessage} />

              <button type="submit" className={s.btn}>
                Create account
              </button>
              <div>
                <p>Already have an account?</p>
                <Link to="/loginPage" className={s.link}>
                  Log in!
                </Link>
              </div>
            </fieldset>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
