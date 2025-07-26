import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { setAuthToken } from '../services/axios';
import { getCurrentUser } from './operations';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      const { token } = response.data;

      setAuthToken(token);
      thunkAPI.dispatch({ type: 'auth/setToken', payload: token });

      thunkAPI.dispatch(getCurrentUser());

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
