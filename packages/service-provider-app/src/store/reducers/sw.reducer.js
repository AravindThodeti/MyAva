import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {};
};

export default function swReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.SW_INIT:
      return {
        ...state,
        serviceWorkerInitialized: !state.serviceWorkerInitialized,
      };
    case actions.SW_UPDATE:
      return {
        ...state,
        serviceWorkerUpdated: !state.serviceWorkerUpdated,
        serviceWorkerRegistration: action.payload,
      };

    default:
      return state;
  }
}
