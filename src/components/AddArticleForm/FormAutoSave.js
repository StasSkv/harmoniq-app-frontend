import { useEffect } from 'react';

export const FormAutoSave = ({ draftKey, values, imageState }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isArticleEmpty =
        !values.article || values.article.replace(/<[^>]*>/g, '').trim().length < 40;
      const isTitleEmpty = !values.title.trim();
      const isImageEmpty = !imageState.data;

      if (isArticleEmpty && isTitleEmpty && isImageEmpty) {
        localStorage.removeItem(draftKey);
        return;
      }

      const draftToSave = {
        title: values.title,
        article: values.article,
        preview: {
          type: imageState.type,
          data: imageState.data,
        },
      };

      localStorage.setItem(draftKey, JSON.stringify(draftToSave));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [draftKey, values.title, values.article, imageState]);

  return null;
};
