import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchAllUsersForAuthorsPage,
  fetchUserById,
  removeSavedArticle,
  saveArticle,
  fetchSavedArticles,
  fetchFollowingByUserId,
  addFollower,
  deleteFollower,
} from './usersOperations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    visibleSavedArticles: [],
    profileUser: null,
    authorsPageItems: [],
    total: 0,
    totalPages: 0,
    currentServerPage: 1,
    isLoading: false,
    authorsPageLoading: false,
    error: null,
    visibleCount: 20,
    saveLoading: {},
    saveError: false,
    savedArticles: [],
    following: [],
  },
  reducers: {
    showMoreUsers: (state) => {
      state.visibleCount += 20;
    },
    resetUsers: (state) => {
      state.items = [];
      state.total = 0;
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

      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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
      .addCase(fetchSavedArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visibleSavedArticles = action.payload;
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
      })
      .addCase(fetchFollowingByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowingByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowingByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFollower.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFollower.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload;
      })
      .addCase(addFollower.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFollower.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFollower.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload;
      })
      .addCase(deleteFollower.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { showMoreUsers, resetUsers, setSavedArticles } = usersSlice.actions;
export default usersSlice.reducer;
