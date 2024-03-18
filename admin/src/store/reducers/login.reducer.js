import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    token: null,
    loading: false,
    error: null
  };
}


export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token
      };

    default:
      return state;
  }
}
