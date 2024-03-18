import * as userAction from "./user.action";
import * as ApiUtils from "../../utils/ApiUtils";
import * as alertAction from "@ava/common/lib/store/actions/alert.action";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import * as actions from "../actionTypes";
import { LS_CURRENT_USER, LS_SP_PROFILE } from "../../constants";

export function getCurrentUser() {
  const user = ApiUtils.getCurrentUser();
  return (dispatch) => {
    dispatch(userAction.fetchUserBegin());
    return user
      .then((res) => {
        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res));
        dispatch(userAction.fetchUserSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(userAction.fetchUserFailure(error));
      });
  };
}

export function getServiceProviderProfile() {
  const profile = ApiUtils.getServiceProviderProfile();
  return (dispatch) => {
    dispatch(userAction.fetchSPProfileBegin());
    return profile
      .then((res) => {
        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
        localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
        dispatch(userAction.fetchSPProfileSuccess(res));
        dispatch(userAction.fetchUserSuccess(res.user));
        return res;
      })
      .catch((error) => {
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function saveProfile(id, data) {
  const profile = ApiUtils.saveProfile(id, data);
  return (dispatch) => {
    dispatch(userAction.saveSPProfileBegin());
    return profile
      .then((res) => {
        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
        localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
        dispatch(userAction.saveSPProfileSuccess(res));
        dispatch(userAction.fetchUserSuccess(res.user));
        dispatch(alertAction.show("Profile Saved Successfully!!"));
        return res;
      })
      .catch((error) => {
        dispatch(userAction.fetchSPProfileFailure(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function saveSignature(id, data) {
  const profile = ApiUtils.saveSignature(id, data);
  return (dispatch) => {
    dispatch(userAction.saveSPProfileBegin());
    return profile
      .then((res) => {
        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
        localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
        dispatch(userAction.saveSPProfileSuccess(res));
        dispatch(userAction.fetchUserSuccess(res.user));
        dispatch(alertAction.show("Signature Uploaded Successfully!!"));
        return res;
      })
      .catch((error) => {
        dispatch(userAction.fetchSPProfileFailure(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function saveImage(id, data) {
  const profile = ApiUtils.saveImage(id, data);
  return (dispatch) => {
    dispatch(userAction.saveSPProfileBegin());
    return profile
      .then((res) => {
        localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
        localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
        dispatch(userAction.saveSPProfileSuccess(res));
        dispatch(userAction.fetchUserSuccess(res.user));
        dispatch(alertAction.show("Image Changed Successfully!!"));
        return res;
      })
      .catch((error) => {
        dispatch(userAction.fetchSPProfileFailure(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getDepartments() {
  const departments = ApiUtils.getDepartments();
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_DEPARTMENTS_BEGIN));
    return departments
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_DEPARTMENTS_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_DEPARTMENTS_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getSchedule() {
  const schedule = ApiUtils.getSchedule();
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_SCHEDULE_BEGIN));
    return schedule
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_SCHEDULE_SUCCESS, res));
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_SCHEDULE_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function saveSchedule(scheduleData) {
  const schedule = ApiUtils.saveSchedule(scheduleData);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.SAVE_SCHEDULE_BEGIN));
    return schedule
      .then((res) => {
        dispatch(crudAction.success(actions.SAVE_SCHEDULE_SUCCESS, res));
        dispatch(alertAction.show("Schedule Saved Successfully!!"));
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.SAVE_SCHEDULE_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getUserPrograms(page = 0, pageSize = 10, status) {
  const programs = ApiUtils.getUserPrograms(page, pageSize, status);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_USER_PROGRAMS_BEGIN));
    return programs
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_USER_PROGRAMS_SUCCESS, res));
      })
      .catch((error) => {
        dispatch(
          crudAction.failure(actions.FETCH_USER_PROGRAMS_FAILURE, error)
        );
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}
