import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Article title must be at least 3 characters long')
    .max(48, 'Article title must be at most 48 characters long')
    .trim()
    .required('Article title is required'),

  article: Yup.string()
    .min(40, 'Description must be at least 40 characters long')
    .max(4000, 'Description must be at most 4000 characters long')
    .trim()
    .required('Article content is required'),
});
