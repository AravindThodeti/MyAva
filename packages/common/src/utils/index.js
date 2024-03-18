export * from "./ApiUtils";
export * from "./PushNotification";
import {
  DEPARTMENTS,
  GYNAECOLOGY_QUESTIONS,
  SKIN_QUESTIONS,
  DIET_QUESTIONS,
} from "../constants/index";

export const getQuestionnaire = (department_id) => {
  if (department_id == DEPARTMENTS.GYNAECOLOGIST) {
    return GYNAECOLOGY_QUESTIONS;
  } else if (department_id == DEPARTMENTS.DERMATOLOGIST) {
    return SKIN_QUESTIONS;
  } else if (department_id == DEPARTMENTS.NUTRITIONIST) {
    return DIET_QUESTIONS;
  }
  return null;
};