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

export const fetchArticlesByOwnerId = createAsyncThunk(
  'articles/fetchArticlesByOwnerId',
  async (ownerId) => {
    const response = await api.get(`/articles/owner/${ownerId}`);
    return response.data;
  }
);

export const fetchArticlesWithParams = createAsyncThunk(
  'articles/fetchArticlesWithParams',
  async ({ filter = 'all', page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const params = {
        page,
        perPage,
        ...(filter !== 'all' && { filter }),
      };
      const response = await api.get('/articles', { params });
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
