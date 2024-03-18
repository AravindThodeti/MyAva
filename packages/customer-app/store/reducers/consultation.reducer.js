import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    activePaginationMeta: null,
    activeConsultations: null,
    inactivePaginationMeta: null,
    inactiveConsultations: null,
    error: null,
  };
};

export default function consultationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_CONSULTATIONS_LIST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_CONSULTATIONS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_CONSULTATIONS_LIST_SUCCESS:
      let consultationsList;
      if (action.payload.active) {
        if (!state.activeConsultations) {
          consultationsList = [];
        } else {
          consultationsList = [...state.activeConsultations];
        }
      } else {
        if (!state.inactiveConsultations) {
          consultationsList = [];
        } else {
          consultationsList = [...state.inactiveConsultations];
        }
      }
      consultationsList = [
        ...consultationsList,
        ...action.payload.res.data,
      ];
      delete action.payload.res.data;
      if (action.payload.active) {
        return {
          ...state,
          loading: false,
          error: null,
          activeConsultations: consultationsList,
          activePaginationMeta: action.payload.res,
        };
      } else {
        return {
          ...state,
          loading: false,
          error: null,
          inactiveConsultations: consultationsList,
          inactivePaginationMeta: action.payload.res,
        };
      }

    default:
      return state;
  }
}
