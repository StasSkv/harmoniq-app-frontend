import axios from 'axios';
// import { store } from './store';
// import { refreshThunk } from './authSlice/authOperations';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.auth.accessToken;
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers['Authorization'] = 'Bearer ' + token;
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshResult = await store.dispatch(refreshThunk()).unwrap();
//         const newToken = refreshResult.accessToken;

//         api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
//         originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
//         processQueue(null, newToken);
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default api;
