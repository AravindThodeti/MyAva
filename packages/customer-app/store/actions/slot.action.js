import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.FETCH_SLOTS_BEGIN,
});

export const success = slots => ({
  type: actions.FETCH_SLOTS_SUCCESS,
  payload: {
    slots
  },
});

export const failure = error => ({
  type: actions.FETCH_SLOTS_FAILURE,
  payload: {
    error,
  },
});
