import s from './AddArticleForm.module.css';
import { FiCamera } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

export const AddArticleForm = () => {
  const [preview, setPreview] = useState(null);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ title: '', desc: '', content: '', photo: null }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => {
        const handleFileChange = (e) => {
          const file = e.currentTarget.files[0];
          setFieldValue('photo', file);
          if (file) {
            setPreview(URL.createObjectURL(file));
          } else {
            setPreview(null);
          }
        };
        return (
          <Form className={s.form}>
            {preview ? (
              <div className={s.previewContainerDesktop}>
                <img src={preview} alt="Preview" className={s.previewImage} />
              </div>
            ) : (
              <label htmlFor="photo" className={s.uploadBoxDesktop}>
                <FiCamera strokeWidth={0.4} color="#070707" size={99} className={s.icon} />
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={s.input}
                />
              </label>
            )}
            <ErrorMessage name="photo" component="div" className={s.errorDesktop} />

            <div className={s.uploadInputContainer}>
              <div className={s.uploadContainer}>
                {preview ? (
                  <div className={s.previewContainerMobile}>
                    <img src={preview} alt="Preview" className={s.previewImage} />
                  </div>
                ) : (
                  <label htmlFor="photo" className={s.uploadBox}>
                    <FiCamera strokeWidth={0.4} color="#070707" size={99} className={s.icon} />
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={s.input}
                    />
                  </label>
                )}
                <ErrorMessage name="photo" component="div" className={s.errorMobile} />

                <div className={s.inputBox}>
                  <label htmlFor="title" className={s.title}>
                    Title
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

              <Field
                className={s.inputTextArea}
                name="content"
                as="textarea"
                placeholder="Enter a text"
              />
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
