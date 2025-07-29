import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/users');
    return response.data.data; //дістаємо масив авторів без зайв.обгортання
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
  }
});
