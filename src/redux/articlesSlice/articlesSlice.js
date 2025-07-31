import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticlesWithParams,
} from './articlesOperation';

const initialState = {
  user: null,
  articles: [],
  newArticle: null,
  currentArticle: null,
  isLoading: false,
  error: null,
  total: 0,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.articles = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.currentArticle = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.newArticle = action.payload.data;
        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.newArticle = action.payload;
        state.isLoading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((article) => article._id !== action.payload._id);
        state.isLoading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticlesWithParams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesWithParams.fulfilled, (state, action) => {
        const page = action.meta.arg.page;
        const { data, total } = action.payload;
        state.articles = page === 1 ? data : [...state.articles, ...data];
        state.total = total;
        state.isLoading = false;
      })
      .addCase(fetchArticlesWithParams.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default articlesSlice.reducer;
