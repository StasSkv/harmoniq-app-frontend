export const selectArticles = (state) => state.articles.articles;
export const selectNewArticle = (state) => state.articles.newArticle;
export const selectCurrentArticle = (state) => state.articles.currentArticle;
export const selectIsLoading = (state) => state.articles.isLoading;
export const selectIsCreateArticle = (state) => state.articles.isCreateArticle;
export const selectError = (state) => state.articles.error;
export const selectUser = (state) => state.auth.user;
export const selectTotal = (state) => state.articles.total;
export const selectArticlesByOwner = (state) => state.articles.articlesByOwner;
export const selectArticleById = (state, articleId) =>
  state.articles.articles.find((article) => article._id === articleId);
