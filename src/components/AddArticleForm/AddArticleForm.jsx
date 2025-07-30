import s from './AddArticleForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { TextArea } from './TextArea';
import { useDispatch } from 'react-redux';
import { createArticle, updateArticle } from '../../redux/articlesSlice/articlesOperation';
import { validationSchema } from './validetionSchema';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';

export const AddArticleForm = ({ article }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(article?.img || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (article?.img) {
      setPreview(article.img);
    }
  }, [article?.img]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('article', values.article);
    if (values.img instanceof File) {
      formData.append('img', values.img);
    }
    let result;
    if (article) {
      result = await dispatch(updateArticle({ articleId: article._id, data: formData }));
      if (updateArticle.fulfilled.match(result)) {
        navigate(`/articles/${result.payload.data._id}`);
      }
    } else {
      result = await dispatch(createArticle(formData));
      if (createArticle.fulfilled.match(result)) {
        navigate(`/articles/${result.payload.data._id}`);
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
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
                <svg className={s.icon} width="99" height="99">
                  <use href={`${sprite}#icon-camera`} />
                </svg>
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
                    <svg className={s.icon} width="99" height="99">
                      <use href={`${sprite}#icon-camera`} />
                    </svg>
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
