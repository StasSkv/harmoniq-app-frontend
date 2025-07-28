import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice/articlesSlice";
import globalReducer from './global/globalSlice';
import { authReducer } from './auth/slice';
import registrationReducer from './auth/registrationSlice';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root-auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);


export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: persistedReducer,
    registration: registrationReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
