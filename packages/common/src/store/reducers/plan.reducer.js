import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    loading: false,
    plans: null,
    error: null,
    programs: null,
  };
};

export default function planReducer(state = INITIAL_STATE, action) {
  let plans = {};
  switch (action.type) {
    case actions.FETCH_PLAN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.FETCH_PLAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        plans: null,
      };
    case actions.FETCH_PLAN_LIST_SUCCESS:
      let programs = {};
      if (state.plans) {
        plans = { ...state.plans };
      }
      if (state.programs) {
        programs = { ...state.programs };
      }
      action.payload.res.data.forEach((p) => {
        plans[p.id] = p;
        if (!programs[p.program_id]) {
          programs[p.program_id] = [];
        }
        programs[p.program_id] = [...programs[p.program_id], p];
      });
      return {
        ...state,
        loading: false,
        error: null,
        plans,
        programs,
      };
    case actions.FETCH_PLAN_SUCCESS:
      if (state.plans) {
        plans = { ...state.plans };
      }
      plans[action.payload.res.id] = action.payload.res;
      return {
        ...state,
        plans,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
