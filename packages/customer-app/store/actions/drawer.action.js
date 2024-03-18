import { DRAWER_OPEN, DRAWER_CLOSE, CHANGE_APP_TITLE } from "../actionTypes";

export const openDrawer = () => ({
  type: DRAWER_OPEN,
});

export const closeDrawer = () => ({
  type: DRAWER_CLOSE,
});

export const setAppTitle = (title, back) => ({
  type: CHANGE_APP_TITLE,
  payload: {
    title,
    back
  }
});