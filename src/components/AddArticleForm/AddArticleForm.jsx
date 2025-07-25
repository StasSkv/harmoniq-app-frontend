import { Formik } from 'formik';
import s from './AddArticleForm.module.css';

export const AddArticleForm = () => {
  return (
    <Formik initialValues={{ title: '', description: '', content: '' }}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={s.input}
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </form>
      )}
    </Formik>
  );
};
