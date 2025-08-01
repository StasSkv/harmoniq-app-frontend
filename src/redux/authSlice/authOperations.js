import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

const setAuthNav = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    await api.post('/auth/register', body);

    const email = body.get('email');
    const password = body.get('password');

    const loginResponse = await api.post('/auth/login', { email, password });

    const { accessToken } = loginResponse.data.data;

    setAuthNav(accessToken);
    return loginResponse.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', {
      email: body.email,
      password: body.password,
    });

    const { accessToken } = response.data.data;

    setAuthNav(accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('auth/logout');
    delete api.defaults.headers.common.Authorization;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const persistedRefreshToken = thunkAPI.getState().auth.refreshToken;

    if (!persistedRefreshToken) {
      return thunkAPI.rejectWithValue('No refresh token');
    }

    const response = await api.post('/auth/refresh', {
      refreshToken: persistedRefreshToken,
    });

    const { accessToken, refreshToken } = response.data.data;

    setAuthNav(accessToken);

    const userResponse = await api.get('/users/current');
    const user = userResponse.data.data.user;

    return { user, refreshToken, accessToken };
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

function handleError(error) {
  if (error?.response?.data?.data) {
    return error.response.data.data;
  }
  return error?.message || 'Unknown error';
}
