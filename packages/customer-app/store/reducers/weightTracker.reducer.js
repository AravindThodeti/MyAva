import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    weights: null,
    error: null,
    userProgramId: null,
  };
};

export default function weightTrackerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        diets: null,
        weights: null,
      };
    case actions.ADD_USER_PROGRAM_WEIGHT:
      let weights;
      if (state.weights != null) {
        weights = [action.payload.res, ...state.weights];
      } else {
        weights = [action.payload.res];
      }
      return {
        ...state,
        weights,
      };
    case actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        weights: action.payload.res.data,
        userProgramId: action.payload.res.userProgramId,
      };

    default:
      return state;
  }
}
