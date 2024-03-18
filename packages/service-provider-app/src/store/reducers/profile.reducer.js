import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
    return {
        profile: null,
        loading: false,
        error: null
    };
}


export default function profileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.FETCH_SP_PROFILE_BEGIN:
        case actions.SAVE_SP_PROFILE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actions.FETCH_SP_PROFILE_FAILURE:
        case actions.SAVE_SP_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case actions.FETCH_SP_PROFILE_SUCCESS:
        case actions.SAVE_SP_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                profile: action.payload.profile
            };

        default:
            return state;
    }
}
