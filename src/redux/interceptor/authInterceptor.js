import { api } from '../api.js';
import { store } from '../store.js';
import { logoutThunk, refreshThunk } from '../authSlice/authOperations.js';
import { toast } from 'react-toastify';
import { navigateTo } from '../../utils/navigateHelper.js';

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
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');
      const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

      if (!isRefreshRequest && isUnauthorized && !originalRequest._retry) {
        originalRequest._retry = true;

        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
          toast.error('Session expired. Please log in again.');
          await store.dispatch(logoutThunk());
          navigateTo?.('/login') ?? (window.location.href = '/login');
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          delete api.defaults.headers.common.Authorization;

          const resultAction = await store.dispatch(refreshThunk());

          if (refreshThunk.fulfilled.match(resultAction)) {
            const newAccessToken = resultAction.payload.accessToken;

            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            processQueue(null, newAccessToken);

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } else {
            toast.error('Session expired. Please log in again.');
            await store.dispatch(logoutThunk());
            processQueue(resultAction.error, null);
            navigateTo?.('/login') ?? (window.location.href = '/login');
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          toast.error('Session expired. Please log in again.');
          await store.dispatch(logoutThunk());
          navigateTo?.('/login') ?? (window.location.href = '/login');
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
