import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';
import { TokenService } from '../../utils/tokenService';
import { navigateTo } from '../../utils/navigateHelper';

export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    await api.post('/auth/register', body);
    const email = body.get('email');
    const password = body.get('password');
    const loginResponse = await api.post('/auth/login', { email, password });
    const { accessToken } = loginResponse.data.data;
    TokenService.setAuthHeader(accessToken);
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
    TokenService.setAuthHeader(accessToken);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('auth/logout');
    TokenService.clearAuthHeader();
  } catch (error) {
    TokenService.clearAuthHeader();
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

export const refreshThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const persistedRefreshToken = thunkAPI.getState().auth.refreshToken;

    if (!persistedRefreshToken) {
      console.error('No refresh token found in state');
      return thunkAPI.rejectWithValue('No refresh token');
    }

    const response = await api.post('/auth/refresh', {
      refreshToken: persistedRefreshToken,
    });

    if (!response.data?.data?.accessToken) {
      console.error('Invalid response format:', response.data);
      return thunkAPI.rejectWithValue('Invalid response format');
    }

    const { accessToken, refreshToken } = response.data.data;
    TokenService.setAuthHeader(accessToken);

    const userResponse = await api.get('/users/current');
    const user = userResponse.data.data.user;

    return { user, refreshToken, accessToken };
  } catch (error) {
    console.error('Refresh token error:', error.response?.data || error.message);
    TokenService.clearAuthHeader();
    if (
      error.response?.status === 403 &&
      error.response?.data?.message === 'Invalid refresh token'
    ) {
      navigateTo('/login');
    }
    return thunkAPI.rejectWithValue(handleError(error));
  }
});

function handleError(error) {
  if (error?.response?.data?.data) {
    return error.response.data.data;
  }
  return error?.message || 'Unknown error';
}
