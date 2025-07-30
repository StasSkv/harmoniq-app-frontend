import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../Loyout/Loyout.jsx';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage.jsx';
import { LoginPage } from '../../pages/LoginPage/LoginPage.jsx';
import { UploadPhotoPage } from '../../pages/UploadPhotoPage/UploadPhotoPage.jsx';

import { HomePage } from '../../pages/HomePage/HomePage.jsx';
import { ArticlesPage } from '../../pages/ArticlesPage/ArticlesPage.jsx';
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage.jsx';
import { AuthorsPage } from '../../pages/AuthorsPage/AuthorsPage.jsx';
import { AuthorProfilePage } from '../../pages/AuthorProfilePage/AuthorProfilePage.jsx';
import { CreateArticlePage } from '../../pages/CreateArticlePage/CreateArticlePage.jsx';
import { ToastContainer } from 'react-toastify';
import  {Loader}  from '../Loader/Loader.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUsers } from '../../redux/users/usersOperations';
import { selectIsLoading } from '../../redux/global/globalSelectors';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="upload-photo" element={<UploadPhotoPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:articleId" element={<ArticlePage />} />

          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:authorId" element={<AuthorProfilePage />} />

          <Route path="create" element={<CreateArticlePage />} />
          <Route path="create/:articleId" element={<CreateArticlePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
