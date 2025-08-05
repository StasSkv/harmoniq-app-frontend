export const handleError = (error, navigate) => {
  let code = 500;
  let message = 'Something went wrong';

  if (error?.response) {
    code = error.response.status || 500;
    message = error.response.data?.message || error.message || 'Unexpected error';
  } else if (error?.message) {
    message = error.message;
  }

  navigate('/error', {
    replace: true,
    state: {
      code,
      message,
    },
  });
};
