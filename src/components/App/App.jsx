import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PrivateRoute } from './PrivateRoute.jsx';
import { RestrictedRoute } from './RestrictedRoute.jsx';

import { Layout } from '../Loyout/Loyout.jsx';
import { ToastContainer } from 'react-toastify';
import { HomePage } from '../../pages/HomePage/HomePage.jsx';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop.jsx';

const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const UploadPhotoPage = lazy(() => import('../../pages/UploadPhotoPage/UploadPhotoPage'));
const ArticlesPage = lazy(() => import('../../pages/ArticlesPage/ArticlesPage'));
const ArticlePage = lazy(() => import('../../pages/ArticlePage/ArticlePage'));
const AuthorsPage = lazy(() => import('../../pages/AuthorsPage/AuthorsPage.jsx'));
const AuthorProfilePage = lazy(() => import('../../pages/AuthorProfilePage/AuthorProfilePage.jsx'));
const CreateArticlePage = lazy(() => import('../../pages/CreateArticlePage/CreateArticlePage.jsx'));

import { selectIsLoading } from '../../redux/globalSlice/globalSelectors.js';
import { LoaderPage } from '../Loader/LoaderPage/LoaderPage.jsx';
import { refreshThunk } from '../../redux/authSlice/authOperations.js';

export const App = () => {
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <>
      {isLoading && <LoaderPage />}
      <Suspense fallback={<LoaderPage />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route
              path="register"
              element={<RestrictedRoute redirectTo="/" component={<RegisterPage />} />}
            />
            <Route
              path="upload-photo"
              element={<RestrictedRoute redirectTo="/" component={<UploadPhotoPage />} />}
            />
            <Route
              path="login"
              element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
            />

            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/:articleId" element={<ArticlePage />} />

            <Route path="authors" element={<AuthorsPage />} />
            <Route path="authors/:authorId" element={<AuthorProfilePage />} />

            <Route
              path="create"
              element={<PrivateRoute redirectTo="/register" component={<CreateArticlePage />} />}
            />
            <Route
              path="create/:articleId"
              element={<PrivateRoute redirectTo="/register" component={<CreateArticlePage />} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
