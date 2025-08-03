export const selectAllUsers = (state) => state.users.items;
export const selectProfileUser = (state) => state.users.profileUser;
export const selectIsLoading = (state) => state.users.isLoading;



export const selectAuthorsPageUsers = (state) => state.users.authorsPageItems; // Для сторінки авторів
export const selectUsersLoading = (state) => state.users.isLoading; // Лоадер для головної
export const selectAuthorsPageLoading = (state) => state.users.authorsPageLoading; // Лоадер для сторінки авторів
export const selectUsersError = (state) => state.users.error;
export const selectUsersTotal = (state) => state.users.total; // Новий селектор для total
export const selectUsersTotalPages = (state) => state.users.totalPages; // Селектор для кількості сторінок pag2
export const selectSavedArticles = (state) => state.users.savedArticles;
export const selectSaveLoading = (articleId) => (state) =>
  state.users.saveLoading[articleId] || false;