import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice/articlesSlice";
export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
  },
});
