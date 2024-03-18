import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    currentUser: null,
    loading: false,
    error: null,
  };
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentUser: action.payload.user,
      };

    default:
      return state;
  }
}
