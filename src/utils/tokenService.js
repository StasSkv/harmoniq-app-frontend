import { api } from '../redux/api';

export const TokenService = {
  setAuthHeader(token) {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return true;
    }
    return false;
  },

  clearAuthHeader() {
    try {
      delete api.defaults.headers.common.Authorization;
      return true;
    } catch (error) {
      console.error('Error clearing auth header:', error);
      return false;
    }
  },

  isTokenExpired(error) {
    return error.response?.status === 401;
  },

  getTokenFromHeader() {
    const authHeader = api.defaults.headers.common.Authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return null;
  },
};
