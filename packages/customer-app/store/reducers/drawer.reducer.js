import * as actions from "../actionTypes";

const INITIAL_STATE = async () => {
  return {
    open: false,
    title: "AVA",
    backButton: false
  };
};

export default function drawerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.DRAWER_OPEN:
      return {
        ...state,
        open: true,
      };
    case actions.DRAWER_CLOSE:
      return {
        ...state,
        open: false,
      };
    case actions.CHANGE_APP_TITLE:
      let backButton = action.payload.back;
      if (backButton === undefined) {
        backButton = false;
      }
      return {
        ...state,
        title: action.payload.title,
        backButton
      };

    default:
      return state;
  }
}
