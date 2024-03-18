import * as actions from "../actionTypes";
const initState = {
  loading: false,
  planPurchase: null,
  error: null,
};
const INITIAL_STATE = async () => {
  return { ...initState };
};

export default function planPurchaseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.PLAN_PURCHASE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.PLAN_PURCHASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.PLAN_PURCHASE_RESET:
      return {
        ...state,
        ...initState,
      };
    case actions.PLAN_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        planPurchase: action.payload.planPurchase,
      };

    default:
      return state;
  }
}
