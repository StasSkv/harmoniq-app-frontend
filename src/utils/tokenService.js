import { api } from '../redux/api';

export const TokenService = {
  setAuthHeader(token) {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  },
  clearAuthHeader() {
    delete api.defaults.headers.common.Authorization;
  },
  isTokenExpired(error) {
    return error.response?.status === 401;
  },
};
