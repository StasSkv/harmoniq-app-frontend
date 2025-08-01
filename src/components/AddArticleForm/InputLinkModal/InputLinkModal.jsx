import { useState } from 'react';
import s from './InputLinkModal.module.css';
import clsx from 'clsx';

export const InputLinkModal = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) {
      onSubmit(url.trim());
      setUrl('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.form}>
        <label className={s.label}>
          Enter URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className={s.input}
          />
        </label>
        <div className={s.buttons}>
          <button
            className={clsx(s.btn, s.btnCancel)}
            type="button"
            onClick={() => {
              setUrl('');
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className={clsx(s.btn, s.btnAdd)}
            onClick={() => {
              handleSubmit();
            }}
          >
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
};
