import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api.js';

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (params = {}, thunkAPI) => {
  try {
    const response = await api.get('/users', { params });
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
  }
});

export const saveArticle = createAsyncThunk('articles/saveArticle', async (articleId, thunkAPI) => {
  try {
    const response = await api.post(`/users/save/${articleId}`);
    const articleResponse = await api.get(`/articles/${articleId}`);
    return {
      data: response.data.data,
      article: articleResponse.data.data,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to save article');
  }
});

export const fetchSavedArticles = createAsyncThunk(
  'articles/fetchSavedArticles',
  async (thunkAPI) => {
    try {
      const response = await api.get(`/users/saved-articles`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch saved articles');
    }
  }
);

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (authorId, thunkAPI) => {
  try {
    const response = await api.get(`/users/${authorId}`);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
  }
});

export const removeSavedArticle = createAsyncThunk(
  'articles/removeSavedArticle',
  async (articleId, thunkAPI) => {
    try {
      const response = await api.delete(`/users/save/${articleId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to remove article');
    }
  }
);

export const fetchFollowingByUserId = createAsyncThunk(
  'users/fetchFollowingByUserId',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(`/users/following/${userId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch following');
    }
  }
);

export const addFollower = createAsyncThunk('users/addFollowing', async (userId, thunkAPI) => {
  try {
    const response = await api.patch(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to add follower');
  }
});

export const deleteFollower = createAsyncThunk('users/deleteFollower', async (userId, thunkAPI) => {
  try {
    const response = await api.patch(`/users/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to delete follower');
  }
});

export const deleteUserInfo = createAsyncThunk('users/deleteUserInfo', async (userId, thunkAPI) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update user info');
  }
});

export const updateUserInfo = createAsyncThunk(
  'users/updateUserInfo',
  async (userInfo, thunkAPI) => {
    try {
      let dataToSend = userInfo;
      let headers = {};
      if (userInfo.avatar instanceof File) {
        const formData = new FormData();
        Object.entries(userInfo).forEach(([key, value]) => {
          formData.append(key, value);
        });
        dataToSend = formData;
        headers['Content-Type'] = 'multipart/form-data';
      }
      const response = await api.patch(`/users/info`, dataToSend, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update user info');
    }
  }
);

export const fetchUsersWithParams = createAsyncThunk(
  'users/fetchUsersWithParams',
  async ({ filter = 'all', page = 1, limit = 20 }, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        ...(filter !== 'all' && { filter }),
      };
      const response = await api.get('/users', { params });
      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);
