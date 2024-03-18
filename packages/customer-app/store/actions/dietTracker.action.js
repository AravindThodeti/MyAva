import * as actions from "../actionTypes";

export const setDietPlan = (dietPlan) => ({
  type: actions.SET_DIET_PLAN,
  payload: dietPlan,
});

export const addDishesToMeal = (mealTime, dishes) => ({
  type: actions.ADD_DISHES_TO_MEAL,
  payload: { sessionName: mealTime, dishes },
});

export const addDishToMeal = (mealTime, dish) => ({
  type: actions.ADD_DISH_TO_MEAL,
  payload: { sessionName: mealTime, dish },
});

export const replaceDish = (mealTime, dishId, replacementDish) => ({
  type: actions.REPLACE_DISH,
  payload: { sessionName: mealTime, dishId, replacementDish },
});

export const deleteDish = (mealTime, dishId) => ({
  type: actions.DELETE_DISH,
  payload: { sessionName: mealTime, dishId },
});

export const setTackStatusForMeal = (mealTime, trackStatus) => ({
  type: actions.SET_TRACK_STATUS_FOR_MEAL,
  payload: { sessionName: mealTime, trackStatus },
});

export const changeDishQuantity = (mealTime, dishId, quantity) => ({
  type: actions.CHANGE_DISH_QUANTITY,
  payload: { sessionName: mealTime, dishId, quantity },
});
