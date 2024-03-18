import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    res: null,
    loading: false,
    error: null,
  };
};

export default function paymentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.CAPTURE_PAYMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.CAPTURE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case actions.CAPTURE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        res: action.payload.res,
      };

    default:
      return state;
  }
}
