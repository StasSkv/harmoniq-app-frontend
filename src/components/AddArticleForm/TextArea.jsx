import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import s from './AddArticleForm.module.css';

export const TextArea = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
    helpers.setValue(e.target.value);
    adjustHeight();
  };

  useEffect(() => {
    adjustHeight();
  }, [field.value]);

  return (
    <>
      <textarea
        {...field}
        {...props}
        ref={textareaRef}
        className={s.inputTextArea}
        onChange={handleChange}
        placeholder="Enter a text"
        rows={1}
      />
      {meta.touched && meta.error && <div className={s.error}>{meta.error}</div>}
    </>
  );
};
