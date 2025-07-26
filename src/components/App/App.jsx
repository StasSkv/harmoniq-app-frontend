import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../Loyout/Loyout.jsx";
import { HomePage } from "../../pages/HomePage/HomePage.jsx";
import { ArticlePage } from "../../pages/ArticlePage/ArticlePage.jsx";
import { ArticlesPage } from "../../pages/ArticlesPage/ArticlesPage.jsx";
import { AuthorProfilePage } from "../../pages/AuthorProfilePage/AuthorProfilePage.jsx";
import { AuthorsPage } from "../../pages/AuthorsPage/AuthorsPage.jsx";
import { CreateArticlePage } from "../../pages/CreateArticlePage/CreateArticlePage.jsx";
import { LoginPage } from "../../pages/LoginPage/LoginPage.jsx";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage.jsx";
import { getCurrentUser } from "../../redux/auth/operations.js";       
import { setAuthToken } from "../../redux/services/axios.js";                 
import { PrivateRoute } from "../../redux/routes/PrivateRoute.jsx";           
import { PublicRoute } from "../../redux/routes/PublicRoute.jsx";             

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="articlePage" element={<ArticlePage />} />
        <Route path="articlesPage" element={<ArticlesPage />} />
        <Route path="authorProfilePage" element={<AuthorProfilePage />} />
        <Route path="authorsPage" element={<AuthorsPage />} />
        <Route path="create" element={<PrivateRoute component={CreateArticlePage} />} />
        <Route path="loginPage" element={<PublicRoute component={LoginPage} restricted />} />
        <Route path="registerPage" element={<PublicRoute component={RegisterPage} restricted />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
