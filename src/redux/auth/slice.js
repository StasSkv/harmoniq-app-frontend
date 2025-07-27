import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
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
        state.user = action.payload.user;
        state.token = action.payload.token;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
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
      .addCase(logoutThunk.fulfilled, () => ({
        ...initialState,
      }))
      .addCase(logoutThunk.rejected, (state) => {
        state.isPending = false;
        state.isError = true;
      })

      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
