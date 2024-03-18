import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.CAPTURE_PAYMENT_BEGIN,
});

export const success = res => ({
  type: actions.CAPTURE_PAYMENT_SUCCESS,
  payload: {
    res
  },
});

export const failure = error => ({
  type: actions.CAPTURE_PAYMENT_FAILURE,
  payload: {
    error,
  },
});
