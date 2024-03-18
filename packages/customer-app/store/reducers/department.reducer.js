import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    allDepartments: null,
    consultancyDepartments: null,
    error: null,
  };
};

export default function departmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_DEPARTMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_ALL_DEPARTMENT_FAILURE:
    case actions.FETCH_CONSULTANCY_DEPARTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.FETCH_ALL_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allDepartments: action.payload.departments,
      };
    case actions.FETCH_CONSULTANCY_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        consultancyDepartments: action.payload.departments,
      };

    default:
      return state;
  }
}
