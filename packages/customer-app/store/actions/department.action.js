import * as actions from "../actionTypes";

export const fetchDepartmentBegin = () => ({
  type: actions.FETCH_DEPARTMENT_BEGIN,
});

export const fetchAllDepartmentSuccess = (departments) => ({
  type: actions.FETCH_ALL_DEPARTMENT_SUCCESS,
  payload: {
    departments,
  },
});

export const fetchConsultancyDepartmentSuccess = (departments) => ({
  type: actions.FETCH_CONSULTANCY_DEPARTMENT_SUCCESS,
  payload: {
    departments,
  },
});

export const fetchAllDepartmentFailure = (error) => ({
  type: actions.FETCH_ALL_DEPARTMENT_FAILURE,
  payload: {
    error,
  },
});

export const fetchConsultancyDepartmentFailure = (error) => ({
  type: actions.FETCH_CONSULTANCY_DEPARTMENT_FAILURE,
  payload: {
    error,
  },
});
