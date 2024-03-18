import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    initConsultation: null,
    loading: false,
    error: null,
  };
};

export default function initConsultationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.INIT_CONSULTATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.INIT_CONSULTATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.INIT_CONSULTATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        initConsultation: action.payload.initConsultation,
      };
    case actions.INIT_CONSULTATION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        initConsultation: action.payload.initConsultation,
      };

    default:
      return state;
  }
}
