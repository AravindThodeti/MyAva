import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    call: null,
    error: null,
  };
};

export default function callReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.CREATE_CALL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.CREATE_CALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        call: null,
      };
    case actions.CREATE_CALL_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        call: null,
      };
    case actions.CREATE_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        call: action.payload.res,
      };

    default:
      return state;
  }
}
