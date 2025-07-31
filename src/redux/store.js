import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice/articlesSlice';
import globalReducer from './globalSlice/globalSlice.js';
import { authReducer } from './authSlice/authSlice.js';
import registrationReducer from './authSlice/registrationSlice.js';
import storage from 'redux-persist/lib/storage';
import usersReducer from './usersSlice/usersSlice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { api } from './api.js';

const persistConfig = {
  key: 'root-auth',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const tokenMiddleware = () => (next) => (action) => {
  if (action.type === REHYDRATE) {
    const accessToken = action.payload?.accessToken;
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: persistedReducer,
    registration: registrationReducer,
    global: globalReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tokenMiddleware),
});

export const persistor = persistStore(store);
