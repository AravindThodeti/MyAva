import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_SP_PROFILE_BEGIN, FETCH_SP_PROFILE_FAILURE, FETCH_SP_PROFILE_SUCCESS, SAVE_SP_PROFILE_BEGIN, SAVE_SP_PROFILE_SUCCESS, SAVE_SP_PROFILE_FAILURE } from "../actionTypes";

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    user
  }
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: {
    error
  }
});

export const fetchSPProfileBegin = () => ({
  type: FETCH_SP_PROFILE_BEGIN
});

export const fetchSPProfileSuccess = profile => ({
  type: FETCH_SP_PROFILE_SUCCESS,
  payload: {
    profile
  }
})

export const fetchSPProfileFailure = error => ({
  type: FETCH_SP_PROFILE_FAILURE,
  payload: {
    error
  }
});

export const saveSPProfileBegin = () => ({
  type: SAVE_SP_PROFILE_BEGIN
});

export const saveSPProfileSuccess = profile => ({
  type: SAVE_SP_PROFILE_SUCCESS,
  payload: {
    profile
  }
})

export const saveSPProfileFailure = error => ({
  type: SAVE_SP_PROFILE_FAILURE,
  payload: {
    error
  }
});