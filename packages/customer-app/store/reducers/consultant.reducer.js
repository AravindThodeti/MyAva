import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    consultants: {},
    error: null,
  };
};

export default function consultantReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_CONSULTANTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_CONSULTANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_CONSULTANTS_SUCCESS:
      let consultants = { ...state.consultants };
      consultants[action.payload.id] = action.payload.consultants;
      return {
        ...state,
        loading: false,
        error: null,
        consultants: consultants,
      };

    default:
      return state;
  }
}
