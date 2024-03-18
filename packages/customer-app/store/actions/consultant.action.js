import * as actions from "../actionTypes";

export const fetchConsultantsBegin = () => ({
  type: actions.FETCH_CONSULTANTS_BEGIN,
});

export const fetchConsultantsSuccess = (id, consultants) => ({
  type: actions.FETCH_CONSULTANTS_SUCCESS,
  payload: {
    id,
    consultants,
  },
});

export const fetchConsultantsFailure = (error) => ({
  type: actions.FETCH_CONSULTANTS_FAILURE,
  payload: {
    error,
  },
});
