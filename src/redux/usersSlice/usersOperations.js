import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (params = {}, thunkAPI) => {
  try {
    const response = await api.get('/users', { params });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
  }
});

export const saveArticle = createAsyncThunk('articles/saveArticle', async (articleId, thunkAPI) => {
  try {
    const response = await api.post(`/users/save/${articleId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to save article');
  }
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (authorId, thunkAPI) => {
  try {
    const response = await api.get(`/users/${authorId}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
  }
});

export const removeSavedArticle = createAsyncThunk(
  'articles/removeSavedArticle',
  async (articleId, thunkAPI) => {
    try {
      const response = await api.delete(`/users/save/${articleId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to remove article');
    }
  }
);

export const fetchAllUsersForAuthorsPage = createAsyncThunk(
  'users/fetchForAuthorsPage',
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get('/users', { params });
      const result = {
        data: response.data.data,
        total: response.data.pagination.totalItems,
        totalPages: response.data.pagination.totalPages,
        currentPage: response.data.pagination.page,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPreviousPage: response.data.pagination.hasPreviousPage,
      };
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);
