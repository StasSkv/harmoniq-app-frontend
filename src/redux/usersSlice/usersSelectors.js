export const selectAllUsers = (state) => state.users.items;
export const selectProfileUser = (state) => state.users.profileUser;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectVisibleSavedArticles = (state) => state.users.visibleSavedArticles;
export const selectFollowing = (state) => state.users.following;

export const selectAuthorsPageUsers = (state) => state.users.authorsPageItems;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectAuthorsPageLoading = (state) => state.users.authorsPageLoading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersPagination = (state) => state.users.pagination;
export const selectSavedArticles = (state) => state.users.savedArticles;
export const selectSaveLoading = (articleId) => (state) =>
  state.users.saveLoading[articleId] || false;
