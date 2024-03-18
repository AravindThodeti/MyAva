import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    group: null,
    loading: false,
    error: null
  };
}


export default function groupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_GROUP_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.FETCH_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actions.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        group: action.payload.group
      };

    default:
      return state;
  }
}
