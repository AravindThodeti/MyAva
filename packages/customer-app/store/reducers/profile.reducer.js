import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    profile: null,
    loading: false,
    fetchError: null,
    saveError: null,
    profileSaved: false
  };
};

export default function profileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
        fetchError: null,
        saveError: null,
        profileSaved: false
      };
    case actions.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        profileSaved: false
      };
    case actions.SAVE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        saveError: action.payload.error,
        profileSaved: false
      };
    case actions.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        saveError: null,
        profile: action.payload.profile,
        profileSaved: action.payload.profileSaved
      };
    case actions.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: null,
        profile: action.payload.profile,
        profileSaved: false
      };

    default:
      return state;
  }
}
