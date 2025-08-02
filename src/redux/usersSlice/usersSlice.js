import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchAllUsersForAuthorsPage,
  removeSavedArticle,
  saveArticle,
} from './usersOperations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    authorsPageItems: [], // Для сторінки авторів
    total: 0, // Додаємо поле для total
    totalPages: 0, // Додано для кількості сторінок pag2
    currentServerPage: 1, // Поточна сторінка з сервера pag2
    isLoading: false,
    authorsPageLoading: false, // Окремий лоадер для сторінки авторів
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
      state.total = 0; // Скидаємо також total
      state.visibleCount = 20;
      state.error = null;
    },
    setSavedArticles(state, action) {
      state.savedArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Для головної сторінки
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
      // Для сторінки авторів з пагінацією
      .addCase(fetchAllUsersForAuthorsPage.pending, (state) => {
        state.authorsPageLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersForAuthorsPage.fulfilled, (state, action) => {
        state.authorsPageLoading = false;
        state.authorsPageItems = action.payload.data;
        state.total = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentServerPage = action.payload.currentPage || 1;
      })
      .addCase(fetchAllUsersForAuthorsPage.rejected, (state, action) => {
        state.authorsPageLoading = false;
        state.error = action.payload;
      })
      // Інші операції
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
