import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

export const fetchAllArticles = createAsyncThunk('articles/fetchAllArticles', async () => {
  const response = await api.get('/articles');
  return response.data;
});

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

export const fetchArticlesWithParams = createAsyncThunk(
  'articles/fetchArticlesWithParams',
  async ({ filter = 'all', page = 1, limit = 12 }, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        ...(filter !== 'all' && { type: filter }),
      };

      const response = await api.get('/articles', { params });

      return {
        data: response.data.data,
        total: response.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
