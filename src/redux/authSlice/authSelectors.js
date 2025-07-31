export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsError = (state) => state.auth.isError;
export const selectIsPending = (state) => state.auth.isPending;

export const selectRegistration = (state) => state.registration;
export const selectRegistrationName = (state) => state.registration.name;
export const selectRegistrationEmail = (state) => state.registration.email;
export const selectRegistrationPassword = (state) => state.registration.password;
