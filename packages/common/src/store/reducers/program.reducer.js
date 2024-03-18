import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    programs: null,
    error: null,
  };
};

export default function programReducer(state = INITIAL_STATE, action) {
  let programs = {};
  switch (action.type) {
    case actions.FETCH_PROGRAM_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_PROGRAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        programs: null,
      };
    case actions.FETCH_PROGRAM_LIST_SUCCESS:
      if (state.programs) {
        programs = { ...state.programs };
      }
      action.payload.res.data.forEach((p) => (programs[p.id] = p));
      return {
        ...state,
        loading: false,
        error: null,
        programs,
      };
    case actions.FETCH_PROGRAM_SUCCESS:
      if (state.programs) {
        programs = { ...state.programs };
      }
      programs[action.payload.res.id] = action.payload.res;
      return {
        ...state,
        loading: false,
        error: null,
        programs,
      };

    default:
      return state;
  }
}
