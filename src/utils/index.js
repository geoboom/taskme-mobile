export const handleError = (e) => {
  if (e.response) {
    return e.response.data;
  } else if (e.request) {
    return 'Failed to connect to server.';
  }
  return e;
};
