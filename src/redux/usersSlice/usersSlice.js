import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, removeSavedArticle, saveArticle } from './usersOperations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    visibleCount: 20,
    saveLoading: {},
    saveError: false,
    savedArticles: [],
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
    setSavedArticles(state, action) {
      state.savedArticles = action.payload;
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
      })
      .addCase(saveArticle.pending, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = true;
        state.saveError = null;
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = false;
        state.savedArticles = action.payload.data;
      })
      .addCase(saveArticle.rejected, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = false;
        state.saveError = action.payload;
      })

      .addCase(removeSavedArticle.pending, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = true;
        state.saveError = null;
      })
      .addCase(removeSavedArticle.fulfilled, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = false;
        state.savedArticles = action.payload.data;
      })
      .addCase(removeSavedArticle.rejected, (state, action) => {
        const articleId = action.meta.arg;
        state.saveLoading[articleId] = false;
        state.saveError = action.payload;
      });
  },
});

export const { showMoreUsers, resetUsers, setSavedArticles } = usersSlice.actions;
export default usersSlice.reducer;
