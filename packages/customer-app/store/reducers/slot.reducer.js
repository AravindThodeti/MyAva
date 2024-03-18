import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    slots: null,
    error: null,
  };
};

export default function slotReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_SLOTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_SLOTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        slots: null
      };
    case actions.FETCH_SLOTS_SUCCESS:
      let slotMap = {};
      action.payload.slots.forEach(slot => {
        slotMap[slot.date] = slot.slot_timings;
      });
      return {
        ...state,
        loading: false,
        error: null,
        slots: slotMap
      };

    default:
      return state;
  }
}
