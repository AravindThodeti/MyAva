import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.FETCH_GROUP_BEGIN,
});

export const success = group => ({
  type: actions.FETCH_GROUP_SUCCESS,
  payload: {
    group
  },
});

export const failure = error => ({
  type: actions.FETCH_GROUP_FAILURE,
  payload: {
    error,
  },
});
