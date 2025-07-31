import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers } from './usersOperations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    visibleCount: 20,
  },
  reducers: {
    showMoreUsers: (state) => {
      state.visibleCount += 20;
    },
    resetUsers: (state) => {
      state.items = [];
      state.visibleCount = 20;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { showMoreUsers, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
