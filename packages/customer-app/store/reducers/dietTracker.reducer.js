import {
  SET_DIET_PLAN,
  ADD_DISHES_TO_MEAL,
  SET_TRACK_STATUS_FOR_MEAL,
  REPLACE_DISH,
  DELETE_DISH,
  ADD_DISH_TO_MEAL,
  CHANGE_DISH_QUANTITY,
} from "../actionTypes";

const INITIAL_STATE = {
  dietPlan: "",
};

const addDishesToSession = (sessionName, dietPlan, dishes) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      session.user_recipe_details.push(...dishes);
    }
  });
};

const addDishToSession = (sessionName, dietPlan, dish) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      session.user_recipe_details.push(dish);
    }
  });
};

const setTrackStatus = (sessionName, trackStatus, dietPlan) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      session.is_tracked = trackStatus;
    }
  });
};

const replaceDish = (dishId, dish, sessionName, dietPlan) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      const dishIndex = session.user_recipe_details.findIndex(
        (recipe) => recipe.id === dishId
      );
      session.user_recipe_details.splice(dishIndex, 1, ...dish);
    }
  });
};

const deleteDish = (dishId, sessionName, dietPlan) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      const dishIndex = session.user_recipe_details.findIndex(
        (recipe) => recipe.id === dishId
      );
      session.user_recipe_details.splice(dishIndex, 1);
    }
  });
};

const changeDishQuantity = (sessionName, dishId, quantity, dietPlan) => {
  dietPlan.session_list.forEach((session) => {
    if (session.meal_timing === sessionName) {
      const dish = session.user_recipe_details.find(
        (recipe) => recipe.id === dishId
      );
      dish.quantity = quantity;
    }
  });
};

export default function dietTrackerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DIET_PLAN:
      return {
        ...state,
        dietPlan: action.payload,
      };
    case ADD_DISHES_TO_MEAL: {
      const { sessionName, dishes } = action.payload;
      addDishesToSession(sessionName, state.dietPlan, dishes);
      return { ...state };
    }
    case ADD_DISH_TO_MEAL: {
      const { sessionName, dish } = action.payload;
      addDishToSession(sessionName, state.dietPlan, dish);
      return {
        ...state,
        dietPlan: {
          ...state.dietPlan,
          session_list: [...state.dietPlan.session_list],
        },
      };
    }
    case SET_TRACK_STATUS_FOR_MEAL: {
      const { trackStatus, sessionName } = action.payload;
      setTrackStatus(sessionName, trackStatus, state.dietPlan);
      return {
        ...state,
        dietPlan: {
          ...state.dietPlan,
          session_list: [...state.dietPlan.session_list],
        },
      };
    }
    case REPLACE_DISH: {
      const { sessionName, dishId, replacementDish } = action.payload;
      replaceDish(dishId, replacementDish, sessionName, state.dietPlan);
      return {
        ...state,
        dietPlan: {
          ...state.dietPlan,
          session_list: [...state.dietPlan.session_list],
        },
      };
    }
    case DELETE_DISH: {
      const { sessionName, dishId } = action.payload;
      deleteDish(dishId, sessionName, state.dietPlan);
      return {
        ...state,
        dietPlan: {
          ...state.dietPlan,
          session_list: [...state.dietPlan.session_list],
        },
      };
    }
    case CHANGE_DISH_QUANTITY: {
      const { sessionName, dishId, quantity } = action.payload;
      changeDishQuantity(sessionName, dishId, quantity, state.dietPlan);
      return {
        ...state,
        dietPlan: {
          ...state.dietPlan,
          session_list: [...state.dietPlan.session_list],
        },
      };
    }
    default:
      return state;
  }
}
