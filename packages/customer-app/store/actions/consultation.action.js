import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.FETCH_CONSULTATIONS_LIST_BEGIN,
});

export const success = (res, active) => ({
  type: actions.FETCH_CONSULTATIONS_LIST_SUCCESS,
  payload: {
    res,
    active
  },
});

export const failure = error => ({
  type: actions.FETCH_CONSULTATIONS_LIST_FAILURE,
  payload: {
    error,
  },
});
