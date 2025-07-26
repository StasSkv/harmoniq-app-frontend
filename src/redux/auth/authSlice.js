import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from './operations';

const initialState = {
  user: null,                            
  token: localStorage.getItem('token') || null, 
  isLoggedIn: false,                    
  isRefreshing: false,                  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
