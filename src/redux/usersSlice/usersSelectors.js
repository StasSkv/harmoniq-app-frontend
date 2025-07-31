export const selectAllUsers = (state) => state.users.items;
export const selectVisibleUsers = (state) => state.users.items.slice(0, state.users.visibleCount);
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersHasMore = (state) => state.users.visibleCount < state.users.items.length;
