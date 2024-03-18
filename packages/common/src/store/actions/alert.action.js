import * as actions from "../actionTypes";

export const show = (message) => {
  return {
    type: actions.SHOW_ALERT_MESSAGE,
    payload: {
      message,
      id: new Date().getTime(),
    },
  };
};

export const hide = (id) => {
  return {
    type: actions.HIDE_ALERT_MESSAGE,
    payload: {
      id,
    },
  };
};
