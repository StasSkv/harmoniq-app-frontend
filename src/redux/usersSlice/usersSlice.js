import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchUserById,
  removeSavedArticle,
  saveArticle,
  fetchSavedArticles,
  fetchFollowingByUserId,
  addFollower,
  deleteFollower,
  fetchUsersWithParams,
  updateUserInfo,
} from './usersOperations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    visibleSavedArticles: [],
    profileUser: null,
    authorsPageItems: [],
    isLoading: false,
    authorsPageLoading: false,
    error: null,
    saveLoading: {},
    saveError: false,
    savedArticles: [],
    following: [],
    pagination: null,
  },
  reducers: {
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

      .addCase(fetchUsersWithParams.pending, (state) => {
        state.authorsPageLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersWithParams.fulfilled, (state, action) => {
        const { data, pagination } = action.payload;
        const page = Number(action.meta.arg.page);
        state.authorsPageItems = page === 1 ? data : [...state.authorsPageItems, ...data];
        state.pagination = pagination;
        state.authorsPageLoading = false;
      })
      .addCase(fetchUsersWithParams.rejected, (state, action) => {
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
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileUser = action.payload.data;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSavedArticles } = usersSlice.actions;
export default usersSlice.reducer;
