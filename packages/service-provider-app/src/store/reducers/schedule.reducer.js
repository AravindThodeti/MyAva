import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    schedule: null,
    fetchLoading: false,
    fetchError: null,
    saveLoading: false,
    saveError: null,
  };
};

export default function scheduleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_SCHEDULE_BEGIN:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
      };
    case actions.SAVE_SCHEDULE_BEGIN:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
      };
    case actions.FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload.error,
      };
    case actions.SAVE_SCHEDULE_FAILURE:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
      };
    case actions.FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        schedule: action.payload.res,
      };
    case actions.SAVE_SCHEDULE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        schedule: action.payload.res,
      };

    default:
      return state;
  }
}
