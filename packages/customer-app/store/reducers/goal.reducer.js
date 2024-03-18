import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    goals: null,
    error: null,
    userProgramId: null,
    startDate: null,
    endDate: null,
  };
};

export default function goalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_USER_PROGRAM_GOALS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_USER_PROGRAM_GOALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        goals: null,
        userProgramId: null,
        startDate: null,
        endDate: null,
      };
    case actions.FETCH_USER_PROGRAM_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        goals: action.payload.res.data,
        userProgramId: action.payload.res.userProgramId,
        startDate: action.payload.res.startDate,
        endDate: action.payload.res.endDate,
      };

    default:
      return state;
  }
}
