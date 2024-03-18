import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    departments: null,
    loading: false,
    error: null
  };
}


export default function departmentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_DEPARTMENTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.FETCH_DEPARTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actions.FETCH_DEPARTMENTS_SUCCESS:
        let departments = {}
        action.payload.res.forEach((department) => {
            departments[department.id] = department;
        })
      return {
        ...state,
        loading: false,
        error: null,
        departments: departments
      };

    default:
      return state;
  }
}
