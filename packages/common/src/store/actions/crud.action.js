export const actionType = (type) => ({
  type,
});

export const success = (type, res) => ({
  type,
  payload: {
    res,
  },
});

export const failure = (type, error) => ({
  type,
  payload: {
    error,
  },
});
