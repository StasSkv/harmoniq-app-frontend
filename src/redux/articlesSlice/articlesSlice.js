import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticlesWithParams,
  fetchArticlesByOwnerId,
} from './articlesOperation';

const initialState = {
  user: null,
  articles: [],
  articlesByOwner: [],
  pagination: null,
  newArticle: null,
  currentArticle: null,
  isLoading: false,
  error: null,
  isCreateArticle: false,
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
        state.pagination = action.payload.pagination;
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
        state.isCreateArticle = true;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.newArticle = action.payload.data;
        state.isCreateArticle = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isCreateArticle = false;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isCreateArticle = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.newArticle = action.payload;
        state.isCreateArticle = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isCreateArticle = false;
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
      .addCase(fetchArticlesByOwnerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesByOwnerId.fulfilled, (state, action) => {
        state.articlesByOwner = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchArticlesByOwnerId.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticlesWithParams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesWithParams.fulfilled, (state, action) => {
        const { data, pagination } = action.payload;
        state.articles = data;
        state.pagination = pagination;
        state.isLoading = false;
      })
      .addCase(fetchArticlesWithParams.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default articlesSlice.reducer;
