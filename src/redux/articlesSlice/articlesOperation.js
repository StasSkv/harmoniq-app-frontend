import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAllArticles',
  async (params = {}) => {
    const response = await api.get('/articles', { params });
    return response.data;
  }
);

export const fetchArticleById = createAsyncThunk('articles/fetchArticleById', async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
});

export const createArticle = createAsyncThunk('articles/createArticle', async (data) => {
  const response = await api.post('/articles', data);
  return response.data;
});

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ articleId, data }) => {
    const response = await api.patch(`/articles/${articleId}`, data);
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (articleId) => {
  const response = await api.delete(`/articles/${articleId}`);
  return response.data;
});
