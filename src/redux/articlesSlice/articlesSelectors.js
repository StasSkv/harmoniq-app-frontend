export const selectArticles = (state) => state.articles.articles;
export const selectNewArticle = (state) => state.articles.newArticle;
export const selectCurrentArticle = (state) => state.articles.currentArticle;
export const selectIsLoading = (state) => state.articles.isLoading;
export const selectError = (state) => state.articles.error;
export const selectUser = (state) => state.auth.user;