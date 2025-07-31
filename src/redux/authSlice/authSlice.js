import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from './authOperations';

const initialState = {
  user: {},
  refreshToken: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isPending: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.isPending = false;
        state.isError = true;
      })

      .addCase(loginThunk.pending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isPending = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isPending = false;
        state.isError = true;
      })

      .addCase(logoutThunk.pending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = {};
        state.refreshToken = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isPending = false;
        state.isError = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isPending = false;
        state.isError = true;
      })

      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
