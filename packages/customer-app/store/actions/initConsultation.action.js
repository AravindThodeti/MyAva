import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.INIT_CONSULTATION_BEGIN,
});

export const success = initConsultation => ({
  type: actions.INIT_CONSULTATION_SUCCESS,
  payload: {
    initConsultation
  },
});

export const fetch = initConsultation => ({
  type: actions.INIT_CONSULTATION_FETCH_SUCCESS,
  payload: {
    initConsultation
  },
});

export const failure = error => ({
  type: actions.INIT_CONSULTATION_FAILURE,
  payload: {
    error,
  },
});
