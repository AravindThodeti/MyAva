import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    alerts: {},
  };
};

export default function alertReducer(state = INITIAL_STATE, action) {
  const currentAlerts = { ...state.alerts };
  switch (action.type) {
    case actions.SHOW_ALERT_MESSAGE:
      currentAlerts[action.payload.id] = action.payload.message;
      return {
        ...state,
        alerts: currentAlerts,
      };
    case actions.HIDE_ALERT_MESSAGE:
      delete currentAlerts[action.payload.id];
      return {
        ...state,
        alerts: currentAlerts,
      };

    default:
      return state;
  }
}
