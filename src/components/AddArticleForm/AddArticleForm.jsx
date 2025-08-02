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
import { toast } from 'react-toastify';

export const AddArticleForm = ({ article }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef();

  const draftKey = article?._id ? `draft-article-${article._id}` : 'draft-new-article';

  const savedDraft = localStorage.getItem(draftKey);
  const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null;

  const [imageState, setImageState] = useState(() => {
    if (parsedDraft?.preview) {
      return {
        type: 'base64',
        data: parsedDraft.preview.data,
        file: null,
      };
    }
    if (article?.img) {
      return {
        type: 'url',
        data: article.img,
        file: null,
      };
    }
    return {
      type: null,
      data: '',
      file: null,
    };
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!imageState.data) {
      toast.warning('Please upload a photo before publishing the article.');
      return;
    }

    const isArticleEmpty =
      !values.article || values.article.replace(/<[^>]*>/g, '').trim().length < 40;
    if (isArticleEmpty) {
      toast.warning('Article must contain at least 40 visible characters');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('article', values.article);

    // Обробка зображення в залежності від типу
    if (imageState.file) {
      formData.append('img', imageState.file);
    } else if (imageState.type === 'url' && article?.img === imageState.data) {
      // Якщо URL не змінився, не відправляємо його
      // Бекенд залишить старе зображення
    } else if (imageState.type === 'base64') {
      // Конвертуємо base64 в File
      const response = await fetch(imageState.data);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      formData.append('img', file);
    }

    let result;
    if (article) {
      result = await dispatch(updateArticle({ articleId: article._id, data: formData }));
    } else {
      result = await dispatch(createArticle(formData));
    }

    if (
      (article && updateArticle.fulfilled.match(result)) ||
      (!article && createArticle.fulfilled.match(result))
    ) {
      localStorage.removeItem(draftKey);
      resetForm({
        values: {
          title: '',
          article: '',
          img: null,
        },
      });
      editorRef.current?.commands?.setContent('');
      setImageState({ type: null, data: '', file: null });
      navigate(`/articles/${result.payload.data._id}`);
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
          if (file) {
            try {
              const base64 = await fileToBase64(file);
              setFieldValue('img', file);
              setImageState({
                type: 'base64',
                data: base64,
                file: file,
              });
            } catch (error) {
              toast.error('Failed to process the image. Please try again.');
              console.error('File processing error:', error);
            }
          } else {
            setFieldValue('img', null);
            // Повертаємось до початкового стану
            if (article?.img) {
              setImageState({
                type: 'url',
                data: article.img,
                file: null,
              });
            } else {
              setImageState({
                type: null,
                data: '',
                file: null,
              });
            }
          }
        };

        return (
          <>
            <Form className={s.form}>
              {imageState.data ? (
                <div className={s.previewContainerDesktop}>
                  <div className={s.imageWrapper}>
                    <img src={imageState.data} alt="Preview" className={s.previewImage} />
                    <button
                      type="button"
                      className={s.changeImageBtn}
                      onClick={() => document.getElementById('img-desktop').click()}
                    >
                      Change Image
                    </button>
                    <input
                      id="img-desktop"
                      name="img"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={s.input}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              ) : (
                <label htmlFor="img-desktop" className={s.uploadBoxDesktop}>
                  <svg className={s.icon} width="99" height="99">
                    <use href={`${sprite}#icon-camera`} />
                  </svg>
                  <input
                    id="img-desktop"
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
                  {imageState.data ? (
                    <div className={s.previewContainerMobile}>
                      <div className={s.imageWrapper}>
                        <img src={imageState.data} alt="Preview" className={s.previewImage} />
                        <button
                          type="button"
                          className={s.changeImageBtn}
                          onClick={() => document.getElementById('img-mobile').click()}
                        >
                          Change Image
                        </button>
                        <input
                          id="img-mobile"
                          name="img"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={s.input}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="img-mobile" className={s.uploadBox}>
                      <svg className={s.icon} width="99" height="99">
                        <use href={`${sprite}#icon-camera`} />
                      </svg>
                      <input
                        id="img-mobile"
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

            <FormAutoSave draftKey={draftKey} imageState={imageState} values={values} />
          </>
        );
      }}
    </Formik>
  );
};
