import { useEffect } from 'react';
import { useFormikContext } from 'formik';

export const FormAutoSave = ({ draftKey, preview }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      const draftToSave = {
        title: values.title,
        article: values.article,
        preview,
      };
      localStorage.setItem(draftKey, JSON.stringify(draftToSave));
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [values.title, values.article, preview, draftKey]);

  return null;
};
