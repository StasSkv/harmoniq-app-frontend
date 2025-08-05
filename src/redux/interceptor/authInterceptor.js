import { api } from '../api.js';
import { store } from '../store.js';
import { refreshThunk } from '../authSlice/authOperations.js';
import { toast } from 'react-toastify';
import { navigateTo } from '../../utils/navigateHelper.js';
import { TokenService } from '../../utils/tokenService.js';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupAuthInterceptor = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 403 &&
        error.response?.data?.message === 'Invalid refresh token'
      ) {
        await handleLogout();
        return Promise.reject(error);
      }

      if (TokenService.isTokenExpired(error) && !originalRequest._retry) {
        originalRequest._retry = true;
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        if (!refreshToken) {
          await handleLogout();
          return Promise.reject(error);
        }
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        isRefreshing = true;

        try {
          const resultAction = await store.dispatch(refreshThunk());

          if (refreshThunk.fulfilled.match(resultAction)) {
            const newAccessToken = resultAction.payload.accessToken;
            TokenService.setAuthHeader(newAccessToken);
            processQueue(null, newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } else {
            await handleLogout('Failed to refresh token.');
            processQueue(resultAction.error, null);
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          await handleLogout('Error during token refresh.');
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
      if (TokenService.isTokenExpired(error) && originalRequest._retry) {
        await handleLogout('Session expired after token refresh attempt.');
      }
      return Promise.reject(error);
    }
  );
};

const handleLogout = async () => {
  toast.error('Session expired. Please log in again.');
  TokenService.clearAuthHeader();
  store.dispatch({ type: 'auth/logout' });
  navigateTo('/login');
};
