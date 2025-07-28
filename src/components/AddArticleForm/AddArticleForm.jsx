import s from './AddArticleForm.module.css';
import { FiCamera } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { TextArea } from './TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../redux/articlesSlice/articlesOperation';
import { validationSchema } from './validetionSchema';
import { useNavigate } from 'react-router-dom';

export const AddArticleForm = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.newArticle);
  const [preview, setPreview] = useState(article?.img || '');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('article', values.article);
    formData.append('img', values.img);
    await dispatch(createArticle(formData));
    navigate('/');
  };

  return (
    <Formik
      initialValues={{
        title: article?.title || '',
        article: article?.article || '',
        img: article?.img || '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => {
        const handleFileChange = (e) => {
          const file = e.currentTarget.files[0];
          setFieldValue('img', file);
          if (file) {
            setPreview(URL.createObjectURL(file));
          } else {
            setPreview(article.img || null);
          }
        };
        return (
          <Form className={s.form}>
            {preview ? (
              <div className={s.previewContainerDesktop}>
                <img src={preview} alt="Preview" className={s.previewImage} />
              </div>
            ) : (
              <label htmlFor="img" className={s.uploadBoxDesktop}>
                <FiCamera strokeWidth={0.4} color="#070707" size={99} className={s.icon} />
                <input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={s.input}
                />
              </label>
            )}
            <ErrorMessage name="img" component="div" className={s.errorDesktop} />

            <div className={s.uploadInputContainer}>
              <div className={s.uploadContainer}>
                {preview ? (
                  <div className={s.previewContainerMobile}>
                    <img src={preview} alt="Preview" className={s.previewImage} />
                  </div>
                ) : (
                  <label htmlFor="img" className={s.uploadBox}>
                    <FiCamera strokeWidth={0.4} color="#070707" size={99} className={s.icon} />
                    <input
                      id="img"
                      name="img"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={s.input}
                    />
                  </label>
                )}
                <ErrorMessage name="img" component="div" className={s.errorMobile} />

                <div className={s.inputBox}>
                  <label htmlFor="title" className={s.title}>
                    Article title
                  </label>
                  <Field
                    className={s.inputText}
                    name="title"
                    type="text"
                    placeholder="Enter the title"
                  />
                </div>
              </div>
              <ErrorMessage name="title" component="div" className={s.error} />

              <TextArea name="article" />
              <button type="submit" className={s.btn}>
                Publish
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
