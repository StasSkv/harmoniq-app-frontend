import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ component: Component, restricted = false }) => {
  const { isLoggedIn, isRefreshing } = useSelector(state => state.auth);
  if (isRefreshing) return null;
  return isLoggedIn && restricted ? <Navigate to="/" /> : <Component />;
};
