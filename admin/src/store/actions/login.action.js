import * as actions from '../actionTypes';

export const loginBegin = () => ({
  type: actions.LOGIN_BEGIN
});

export const loginSuccess = token => ({
  type: actions.LOGIN_SUCCESS,
  payload: {
    token
  }
});

export const loginFailure = error => ({
  type: actions.LOGIN_FAILURE,
  payload: {
    error
  }
});