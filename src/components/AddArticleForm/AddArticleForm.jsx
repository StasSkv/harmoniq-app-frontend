import s from './AddArticleForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef, useState } from 'react';
import { MyEditor } from './EditorContent/EditorContent';
import { useDispatch } from 'react-redux';
import { createArticle, updateArticle } from '../../redux/articlesSlice/articlesOperation';
import { validationSchema } from './validetionSchema';
import { useNavigate } from 'react-router-dom';
import sprite from '../../assets/icons/sprite.svg';
import { FormAutoSave } from './FormAutoSave.js';
import { fileToBase64 } from './fileToBase64.js';

export const AddArticleForm = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef();

  const draftKey = article?._id ? `draft-article-${article._id}` : 'draft-new-article';

  const savedDraft = localStorage.getItem(draftKey);
  const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null;

  const [preview, setPreview] = useState(parsedDraft?.preview || article?.img || '');

  const handleSubmit = async (values, { resetForm }) => {
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
        localStorage.removeItem(draftKey);
        resetForm({
          values: {
            title: '',
            article: '',
            img: null,
          },
        });
        editorRef.current?.commands?.setContent('');
        setPreview('');
        setTimeout(() => {
          navigate(`/articles/${result.payload.data._id}`);
        }, 0);
      }
    } else {
      result = await dispatch(createArticle(formData));
      if (createArticle.fulfilled.match(result)) {
        localStorage.removeItem(draftKey);
        resetForm({
          values: {
            title: '',
            article: '',
            img: null,
          },
        });
        editorRef.current?.commands?.setContent('');
        setPreview('');
        setTimeout(() => {
          navigate(`/articles/${result.payload.data._id}`);
        }, 0);
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: parsedDraft?.title || article?.title || '',
        article: parsedDraft?.article || article?.article || '',
        img: null,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) => {
        const handleFileChange = async (e) => {
          const file = e.currentTarget.files[0];
          setFieldValue('img', file);
          if (file) {
            const base64 = await fileToBase64(file);
            setPreview(base64);
          } else {
            setPreview(article?.img || '');
          }
        };

        return (
          <>
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
                    <ErrorMessage name="title" component="div" className={s.error} />
                  </div>
                </div>

                <MyEditor
                  value={values.article}
                  onChange={(val) => setFieldValue('article', val)}
                  ref={editorRef}
                />
                <button type="submit" className={s.btn}>
                  Publish
                </button>
              </div>
            </Form>
            <FormAutoSave draftKey={draftKey} preview={preview} />
          </>
        );
      }}
    </Formik>
  );
};
