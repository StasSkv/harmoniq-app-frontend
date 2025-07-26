import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const hapmoniqApi = axios.create({
  baseURL: 'https://harmoniq-app-backend.onrender.com',
});

const setAuthNav = (token) => {
  hapmoniqApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthNav = () => {
  hapmoniqApi.defaults.headers.common.Authorization = `;`;
};

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const response = await hapmoniqApi.post('/users/signup', body);
    setAuthNav(response.data.token);
    return response.data;
  } catch (error) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const response = await hapmoniqApi.post('users/login', body);
    setAuthNav(response.data.token);
    return response.data;
  } catch (error) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await hapmoniqApi.post('users/logout');
    removeAuthNav();
  } catch (error) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const persistedToken = thunkAPI.getState().auth.token;
    if (!persistedToken) {
      return thunkAPI.regectWithValue('No valid token!');
    }
    setAuthNav(persistedToken);

    const response = await hapmoniqApi.get('users/current');
    return response.data;
  } catch (error) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error) {
      message = error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});
