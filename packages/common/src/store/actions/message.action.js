import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.FETCH_MESSAGES_BEGIN,
});

export const success = (groupId, res) => ({
  type: actions.FETCH_MESSAGES_SUCCESS,
  payload: {
    groupId,
    res,
  },
});

export const failure = (error) => ({
  type: actions.FETCH_MESSAGES_FAILURE,
  payload: {
    error,
  },
});

export const reset = () => ({
  type: actions.FETCH_MESSAGES_RESET,
});

export const create = (message) => ({
  type: actions.CREATE_MESSAGE_SUCCESS,
  payload: {
    message,
  },
});

export const createFailed = (error) => ({
  type: actions.CREATE_MESSAGE_FAILURE,
  payload: {
    error,
  },
});

export const resetAdded = () => ({
  type: actions.RESET_MESSAGE_ADDED,
});
