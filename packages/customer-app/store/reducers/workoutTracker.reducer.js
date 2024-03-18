import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    workouts: null,
    error: null,
    userProgramId: null,
    startDate: null,
    endDate: null,
    consumption: [],
  };
};

export default function workoutTrackerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        workouts: null,
        userProgramId: null,
        startDate: null,
        endDate: null,
        consumption: [],
      };
    case actions.ADD_USER_PROGRAM_WORKOUT_CONSUMPTION:
      const consumption = [...state.consumption, action.payload.res];
      return {
        ...state,
        consumption,
      };
    case actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        workouts: action.payload.res.data,
        userProgramId: action.payload.res.userProgramId,
        startDate: action.payload.res.startDate,
        endDate: action.payload.res.endDate,
        consumption: action.payload.res.consumption,
      };

    default:
      return state;
  }
}
