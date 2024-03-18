import * as actions from "../actionTypes";

const BASE_STATE = {
  userPrograms: null,
  paginationMeta: null,
  loading: false,
  error: null,
};

const INITIAL_STATE = async () => {
  return {
    ...BASE_STATE,
  };
};

export default function userProgramReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_USER_PROGRAMS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_USER_PROGRAMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_USER_PROGRAMS_CLEAR:
      return {
        ...BASE_STATE,
        userPrograms: [],
        paginationMeta: null
      };
    case actions.FETCH_USER_PROGRAMS_SUCCESS:
      let userPrograms = [];
      if (state.userPrograms != null) {
        userPrograms = [...state.userPrograms];
      }
      userPrograms = [...userPrograms, ...action.payload.res.data];
      delete action.payload.res.data;
      return {
        ...state,
        loading: false,
        error: null,
        userPrograms,
        paginationMeta: action.payload.res,
      };

    default:
      return state;
  }
}
