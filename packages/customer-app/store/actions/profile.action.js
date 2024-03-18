import * as actions from "../actionTypes";

export const profileBegin = () => ({
  type: actions.PROFILE_BEGIN,
});

export const fetchProfileSuccess = (profile) => ({
  type: actions.FETCH_PROFILE_SUCCESS,
  payload: {
    profile,
  },
});

export const fetchProfileFailure = (error) => ({
  type: actions.FETCH_PROFILE_FAILURE,
  payload: {
    error,
  },
});

export const saveProfileSuccess = (profile) => ({
  type: actions.SAVE_PROFILE_SUCCESS,
  payload: {
    profile,
    profileSaved: true
  },
});

export const saveProfileFailure = (error) => ({
  type: actions.SAVE_PROFILE_FAILURE,
  payload: {
    error,
  },
});
