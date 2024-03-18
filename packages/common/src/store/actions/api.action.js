import * as groupAction from "./group.action";
import * as messageAction from "./message.action";
import * as alertAction from "./alert.action";
import * as crudAction from "./crud.action";
import * as actions from "../actionTypes";
import * as ApiUtils from "../../utils/ApiUtils";

export function getGroup(typeId, groupType) {
  const group = ApiUtils.getGroupByTypeId(typeId, groupType);
  return (dispatch) => {
    dispatch(groupAction.begin());
    return group
      .then((res) => {
        dispatch(groupAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(groupAction.failure(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getMessages(groupId, page) {
  const messages = ApiUtils.getMessages(groupId, page);
  return (dispatch) => {
    dispatch(messageAction.begin());
    return messages
      .then((res) => {
        dispatch(messageAction.success(groupId, res));
        return res;
      })
      .catch((error) => {
        dispatch(messageAction.failure(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function createTextMessage(groupId, data) {
  const message = ApiUtils.createTextMessage(groupId, data);
  return (dispatch) => {
    dispatch(messageAction.begin());
    return message
      .then((res) => {
        dispatch(messageAction.create(res));
        return res;
      })
      .catch((error) => {
        dispatch(messageAction.createFailed(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function createAttachmentMessage(groupId, formData) {
  const message = ApiUtils.createAttachmentMessage(groupId, formData);
  return (dispatch) => {
    dispatch(messageAction.begin());
    return message
      .then((res) => {
        dispatch(messageAction.create(res));
        return res;
      })
      .catch((error) => {
        dispatch(messageAction.createFailed(error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getPrograms(ids) {
  const programs = ApiUtils.getPrograms(ids);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_PROGRAM_BEGIN));
    return programs
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_PROGRAM_LIST_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_PROGRAM_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getProgramDetail(id) {
  const program = ApiUtils.getProgramDetail(id);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_PROGRAM_BEGIN));
    return program
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_PROGRAM_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_PROGRAM_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getPlans(programId, ids) {
  const plans = ApiUtils.getPlans(programId, ids);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_PLAN_BEGIN));
    return plans
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_PLAN_LIST_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_PLAN_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}

export function getPlanDetail(id) {
  const plan = ApiUtils.getPlanDetail(id);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_PLAN_BEGIN));
    return plan
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_PLAN_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.FETCH_PLAN_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  };
}


export function createCall(consultationId) {
  const call = ApiUtils.createCall(consultationId);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.CREATE_CALL_BEGIN));
    return call
      .then((res) => {
        dispatch(crudAction.success(actions.CREATE_CALL_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(crudAction.failure(actions.CREATE_CALL_FAILURE, error));
        dispatch(alertAction.show(error.message || error.error));
      });
  }
}