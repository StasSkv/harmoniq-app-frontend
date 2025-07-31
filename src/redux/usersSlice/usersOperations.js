import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (params = {}, thunkAPI) => {
    try {
      const response = await api.get('/users', { params });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);
