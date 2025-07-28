import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../Loyout/Loyout.jsx';
import { HomePage } from '../../pages/HomePage/HomePage.jsx';
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage.jsx';
import { ArticlesPage } from '../../pages/ArticlesPage/ArticlesPage.jsx';
import { AuthorProfilePage } from '../../pages/AuthorProfilePage/AuthorProfilePage.jsx';
import { AuthorsPage } from '../../pages/AuthorsPage/AuthorsPage.jsx';
import { CreateArticlePage } from '../../pages/CreateArticlePage/CreateArticlePage.jsx';
import { LoginPage } from '../../pages/LoginPage/LoginPage.jsx';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage.jsx';
import { CreatorsPage } from '../../pages/CreatorsPage/CreatorsPage.jsx';
import { UploadPhotoPage } from '../../pages/UploadPhotoPage/UploadPhotoPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articlePage" element={<ArticlePage />} />
          <Route path="articlesPage" element={<ArticlesPage />} />
          <Route path="authorProfilePage" element={<AuthorProfilePage />} />
          <Route path="authorsPage" element={<AuthorsPage />} />
          <Route path="create" element={<CreateArticlePage />} />
          <Route path="loginPage" element={<LoginPage />} />
          <Route path="registerPage" element={<RegisterPage />} />
          <Route path="creatorsPage" element={<CreatorsPage />} />
          <Route path="uploadPhotoPage" element={<UploadPhotoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
