export const selectAllUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
export const selectSavedArticles = (state) => state.users.savedArticles;
export const selectSaveLoading = (articleId) => (state) =>
  state.users.saveLoading[articleId] || false;
