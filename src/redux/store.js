import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice/articlesSlice";
import authReducer from "../redux/auth/authSlice"

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
  },
});
