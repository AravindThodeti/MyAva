import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.PLAN_PURCHASE_BEGIN,
});

export const reset = () => ({
  type: actions.PLAN_PURCHASE_RESET,
});

export const success = planPurchase => ({
  type: actions.PLAN_PURCHASE_SUCCESS,
  payload: {
    planPurchase
  },
});

export const failure = error => ({
  type: actions.PLAN_PURCHASE_FAILURE,
  payload: {
    error,
  },
});
