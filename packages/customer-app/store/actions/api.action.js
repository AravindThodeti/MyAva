import * as actions from "../actionTypes";
import * as userAction from "./user.action";
import * as profileAction from "./profile.action";
// import * as mobileVerificationAction from "./mobileVerification.actions";
import * as departmentAction from "./department.action";
import * as consultantAction from "./consultant.action";
import * as slotAction from "./slot.action";
import * as initConsultationAction from "./initConsultation.action";
import * as paymentAction from "./payment.action";
import * as consultationAction from "./consultation.action";
import * as communityAction from "./community.action";
import * as planPurchaseAction from "./planPurchase.action";
import * as crudAction from "@ava/common/lib/store/actions/crud.action";
import * as ApiUtils from "@/utils/ApiUtils";
import { CURRENT_USER, CURRENT_PROFILE } from "@/constants/index";
import * as constant from "@/constants/index";
import Router from "next/router";
export const LS_ACCESS_TOKEN = "accessToken";
export const LS_TOKEN_EXPIRY = "expiry";
import { addSeconds } from "date-fns";

export function getCurrentUser() {
  const user = ApiUtils.getCurrentUser();
  return (dispatch) => {
    dispatch(userAction.fetchUserBegin());
    return user
      .then((res) => {
        localStorage.setItem(CURRENT_USER, JSON.stringify(res));
        dispatch(userAction.fetchUserSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(userAction.fetchUserFailure(error));
      });
  };
}

export function getCustomerProfile() {
  const profile = ApiUtils.getCustomerProfile();
  return (dispatch) => {
    dispatch(profileAction.profileBegin());
    return profile
      .then((res) => {
        localStorage.setItem(CURRENT_PROFILE, JSON.stringify(res));
        dispatch(profileAction.fetchProfileSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(profileAction.fetchProfileFailure(error));
      });
  };
}
 export async function verifyByMobile(mobileNumber) {
  const token = ApiUtils.getDetailsByMobileNumber(mobileNumber);
  return token.then((res) => {
    res = JSON.parse(JSON.stringify(res));
    localStorage.setItem(LS_ACCESS_TOKEN, res.token);
    localStorage.setItem(LS_TOKEN_EXPIRY, res.expiry);
  });
}
export async function saveUserByMobileVerification(userDetails) {
  const token = ApiUtils.createUserOnOTP(userDetails);
  return token.then((res) => {
    res = JSON.parse(JSON.stringify(res));
    localStorage.setItem(LS_ACCESS_TOKEN, res.token);
    localStorage.setItem(LS_TOKEN_EXPIRY, res.expiry);
  });
}

export function saveProfile(id, data) {
  const profile = ApiUtils.saveCustomerProfile(id, data);
  return (dispatch) => {
    dispatch(profileAction.profileBegin());
    return profile
      .then((res) => {
        dispatch(profileAction.saveProfileSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(profileAction.saveProfileFailure(error));
      });
  };
}

export function updateProfile(id, data) {
  const profile = ApiUtils.updateCustomerProfile(id, data);
  return (dispatch) => {
    dispatch(profileAction.profileBegin());
    return profile
      .then((res) => {
        dispatch(profileAction.saveProfileSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(profileAction.saveProfileFailure(error));
      });
  };
}

export function getConsultancyDepartments() {
  const departments = ApiUtils.getConsultancyDepartments();
  return (dispatch) => {
    dispatch(departmentAction.fetchDepartmentBegin());
    return departments
      .then((res) => {
        dispatch(departmentAction.fetchConsultancyDepartmentSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(departmentAction.fetchConsultancyDepartmentFailure(error));
      });
  };
}

export function getConsultants(departmentId) {
  const consultants = ApiUtils.getConsultants(departmentId);
  return (dispatch) => {
    dispatch(consultantAction.fetchConsultantsBegin());
    return consultants
      .then((res) => {
        dispatch(consultantAction.fetchConsultantsSuccess(departmentId, res));
        return res;
      })
      .catch((error) => {
        dispatch(consultantAction.fetchConsultantsFailure(error));
      });
  };
}

export function getSlots(consultantId) {
  const slots = ApiUtils.getSlots(consultantId);
  return (dispatch) => {
    dispatch(slotAction.begin());
    return slots
      .then((res) => {
        dispatch(slotAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(slotAction.failure(error));
      });
  };
}

export function initiateConsultation(
  consultantId,
  slotStart,
  slotEnd,
  userProgramId
) {
  const initiateConsultation = ApiUtils.initiateConsultation(
    consultantId,
    slotStart,
    slotEnd,
    userProgramId
  );
  return (dispatch) => {
    dispatch(initConsultationAction.begin());
    return initiateConsultation
      .then((res) => {
        dispatch(initConsultationAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(initConsultationAction.failure(error));
      });
  };
}

export function getInitiateConsultation(initConsultationId) {
  const initiateConsultation =
    ApiUtils.getInitiateConsultation(initConsultationId);
  return (dispatch) => {
    dispatch(initConsultationAction.begin());
    return initiateConsultation
      .then((res) => {
        dispatch(initConsultationAction.fetch(res));
        return res;
      })
      .catch((error) => {
        dispatch(initConsultationAction.failure(error));
      });
  };
}

export function capturePayment(initConsultationId, paymentId) {
  const payment = ApiUtils.capturePayment(initConsultationId, paymentId);
  return (dispatch) => {
    dispatch(paymentAction.begin());
    return payment
      .then((res) => {
        dispatch(paymentAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(paymentAction.failure(error));
      });
  };
}

export function getConsultationList(page, active) {
  const consultations = ApiUtils.getConsultationsList(page, active);
  return (dispatch) => {
    dispatch(consultationAction.begin());
    return consultations
      .then((res) => {
        dispatch(consultationAction.success(res, active));
        return res;
      })
      .catch((error) => {
        dispatch(consultationAction.failure(error));
      });
  };
}

export function getCommunityPosts(page, tags, content) {
  const posts = ApiUtils.getCommunityPosts(page, tags, content);
  return (dispatch) => {
    dispatch(communityAction.begin());
    return posts
      .then((res) => {
        dispatch(communityAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(communityAction.failure(error));
      });
  };
}

export function createCommunityPost(data) {
  const post = ApiUtils.createCommunityPosts(data);
  return (dispatch) => {
    dispatch(communityAction.saveBegin());
    return post
      .then((res) => {
        dispatch(communityAction.saveSuccess(res));
        return res;
      })
      .catch((error) => {
        dispatch(communityAction.saveFailure(error));
      });
  };
}

export function getCommunityTags(page) {
  const tags = ApiUtils.getCommunityTags(page);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_COMMUNITY_TAGS_BEGIN));
    return tags
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_COMMUNITY_TAGS_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(
          crudAction.failure(actions.FETCH_COMMUNITY_TAGS_FAILURE, error)
        );
      });
  };
}

export function updateLike(postId, liked) {
  let like;
  if (liked) {
    like = ApiUtils.likePost(postId);
  } else {
    like = ApiUtils.unLikePost(postId);
  }
  return (dispatch) => {
    return like
      .then((res) => {
        dispatch(communityAction.updateLike(res));
        return res;
      })
      .catch((error) => {
        console.log("like error", error);
        if (error.status === 401) {
          Router.push({
            pathname: constant.URL_LOGIN,
            query: {
              redirectTo: constant.URL_COMMUNITY,
            },
          });
        }

        console.log(error);
      });
  };
}

export function initiatePlanPurchase(planId) {
  const planPurchase = ApiUtils.initiatePlanPurchase(planId);
  return (dispatch) => {
    dispatch(planPurchaseAction.begin());
    return planPurchase
      .then((res) => {
        dispatch(planPurchaseAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(planPurchaseAction.failure(error));
      });
  };
}

export function getInitiatePlanPurchase(id) {
  const planPurchase = ApiUtils.getInitiatePlanPurchase(id);
  return (dispatch) => {
    dispatch(planPurchaseAction.begin());
    return planPurchase
      .then((res) => {
        dispatch(planPurchaseAction.success(res));
        return res;
      })
      .catch((error) => {
        dispatch(planPurchaseAction.failure(error));
      });
  };
}

export function saveUserProgramProfile(id, profile) {
  const userProgram = ApiUtils.saveUserProgramProfile(id, profile);
  return (dispatch) => {
    return userProgram
      .then((res) => {
        dispatch(crudAction.success(actions.UPDATE_USER_PROGRAM, res));
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getUserPrograms() {
  const userPrograms = ApiUtils.getUserPrograms();
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_USER_PROGRAMS_BEGIN));
    return userPrograms
      .then((res) => {
        dispatch(crudAction.success(actions.FETCH_USER_PROGRAMS_SUCCESS, res));
        return res;
      })
      .catch((error) => {
        dispatch(
          crudAction.failure(actions.FETCH_USER_PROGRAMS_FAILURE, error)
        );
      });
  };
}

export function getDietTracker(id, startDate, endDate) {
  return async (dispatch) => {
    dispatch(
      crudAction.actionType(actions.FETCH_USER_PROGRAM_DIET_TRACKER_BEGIN)
    );
    try {
      const res = await ApiUtils.getUserProgramDietPlan(id);
      res.userProgramId = id;
      res.startDate = startDate;
      res.endDate = endDate;
      res.consumption = [];
      if (res.data.length > 0) {
        const consumptionMeta = await ApiUtils.getUserProgramDietConsumption(
          id,
          startDate,
          endDate
        );
        res.consumption = consumptionMeta.data;
        const recipeIds = {};
        res.data.forEach((p) => {
          recipeIds[p.recipe_id] = null;
        });
        consumptionMeta.data.forEach((consumption) => {
          recipeIds[consumption.recipe_id] = null;
        });
        const recipesMeta = await ApiUtils.getRecipes(Object.keys(recipeIds));
        recipesMeta.data.forEach((recipe) => {
          recipeIds[recipe.id] = recipe;
        });
        res.data.forEach((p) => {
          p.recipe = recipeIds[p.recipe_id];
        });
        res.consumption.forEach((c) => {
          c.recipe = recipeIds[c.recipe_id];
        });
      }
      dispatch(
        crudAction.success(actions.FETCH_USER_PROGRAM_DIET_TRACKER_SUCCESS, res)
      );
      return res;
    } catch (error) {
      dispatch(
        crudAction.failure(
          actions.FETCH_USER_PROGRAM_DIET_TRACKER_FAILURE,
          error
        )
      );
    }
  };
}

export function getWorkoutTracker(id, startDate, endDate) {
  return async (dispatch) => {
    dispatch(
      crudAction.actionType(actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_BEGIN)
    );
    try {
      const res = await ApiUtils.getUserProgramWorkoutPlan(id);
      res.userProgramId = id;
      res.startDate = startDate;
      res.endDate = endDate;
      res.consumption = [];
      if (res.data.length > 0) {
        const consumptionMeta = await ApiUtils.getUserProgramWorkoutConsumption(
          id,
          startDate,
          endDate
        );
        res.consumption = consumptionMeta.data;

        const activityIds = {};
        res.data.forEach((p) => {
          activityIds[p.activity_id] = null;
        });
        consumptionMeta.data.forEach((consumption) => {
          activityIds[consumption.activity_id] = null;
        });
        const activitiesMeta = await ApiUtils.getActivities(
          Object.keys(activityIds)
        );
        activitiesMeta.data.forEach((activity) => {
          activityIds[activity.id] = activity;
        });
        res.data.forEach((p) => {
          p.activity = activityIds[p.activity_id];
        });
        res.consumption.forEach((c) => {
          c.activity = activityIds[c.activity_id];
        });
      }
      dispatch(
        crudAction.success(
          actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_SUCCESS,
          res
        )
      );
      return res;
    } catch (error) {
      dispatch(
        crudAction.failure(
          actions.FETCH_USER_PROGRAM_WORKOUT_TRACKER_FAILURE,
          error
        )
      );
    }
  };
}

export function getWeightTracker(id) {
  const weights = ApiUtils.getUserProgramWeight(id);
  return (dispatch) => {
    dispatch(
      crudAction.actionType(actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_BEGIN)
    );
    return weights
      .then((res) => {
        res.userProgramId = id;
        dispatch(
          crudAction.success(
            actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_SUCCESS,
            res
          )
        );
        return res;
      })
      .catch((error) => {
        dispatch(
          crudAction.failure(
            actions.FETCH_USER_PROGRAM_WEIGHT_TRACKER_FAILURE,
            error
          )
        );
      });
  };
}

export function getUserProgramGoals(id, startDate, endDate) {
  const goals = ApiUtils.getUserProgramGoals(id, startDate, endDate);
  return (dispatch) => {
    dispatch(crudAction.actionType(actions.FETCH_USER_PROGRAM_GOALS_BEGIN));
    return goals
      .then((res) => {
        res.userProgramId = id;
        res.startDate = startDate;
        res.endDate = endDate;
        dispatch(
          crudAction.success(actions.FETCH_USER_PROGRAM_GOALS_SUCCESS, res)
        );
        return res;
      })
      .catch((error) => {
        dispatch(
          crudAction.failure(actions.FETCH_USER_PROGRAM_GOALS_FAILURE, error)
        );
      });
  };
}
