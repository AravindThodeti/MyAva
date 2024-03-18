import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    programs: null,
    error: null,
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
        programs: null,
      };
    case actions.FETCH_USER_PROGRAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        programs: action.payload.res.data,
      };
    case actions.ADD_USER_PROGRAM:
      return {
        ...state,
        loading: false,
        error: null,
        programs:
          state.programs != null
            ? [action.payload.res, ...state.programs]
            : [action.payload.res],
      };
    case actions.UPDATE_USER_PROGRAM:
      if (state.programs != null) {
        const programs = [...state.programs];
        const index = programs.findIndex(
          (program) => program.id == action.payload.res.id
        );
        if (index > -1) {
          programs[index] = action.payload.res;
          return {
            ...state,
            programs,
          };
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
