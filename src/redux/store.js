import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice/articlesSlice";
import globalReducer from './global/globalSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    global: globalReducer,
  },
});
