import { API_BASE_URL, TRIBE_BASE_URL } from "@ava/common";

export const APP_TITLE = "AVA";
export const APP_NAME = "AVA";
export const APP_DESCRIPTION = "Helping you solve your PCOS.";

export const OAUTH2_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/redirect`;
export const ACCESS_TOKEN = "accessToken";
export const CURRENT_USER = "currentUser";
export const LS_ACCESS_TOKEN = "accessToken";
export const CURRENT_PROFILE = "currentProfile";
export const FCM_TOKEN = "fcmToken";
export const LATEST_MESSAGE_ID = "latestMessageId";
export const LAST_GROUP_ID = "lastGroupId";

export const API_VERSION_URL = API_BASE_URL + "/api/v1";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?user_type=customer&redirect_uri=";
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?user_type=customer&redirect_uri=" +
  OAUTH2_REDIRECT_URI;

export const URL_HOME = "/";
export const URL_SIGNUP = "/user/signup";
export const URL_LOGIN = "/user/otpLogin";
export const URL_LOGOUT = "/user/logout";
export const URL_PROFILE = "/user/profile";
export const URL_CONSULTATION = "/consultation";
export const PCOS_GUIDE = "/pcos-guide";
export const URL_PAY_SUCCESS = "/programs/payment-result/[id]";
export const URL_CONSULTATION_CONSULTANTS_FORMAT =
  "/consultation/departments/[department]/[id]";
export const URL_CONSULTATION_CONSULTANTS = (department, id) =>
  `/consultation/departments/${department}/${id}`;
export const URL_CONSULTATION_SLOT_FORMAT = `/consultation/slots/[id]`;
export const URL_CONSULTATION_SLOT = (id) => `/consultation/slots/${id}`;
export const URL_CONSULTATION_PAYMENT_FORMAT = "/consultation/payment/[id]";
export const URL_CONSULTATION_PAYMENT = (id) => `/consultation/payment/${id}`;
export const URL_CONSULTATION_CONFIRM_FORMAT =
  "/consultation/consultation/[id]/confirm";
export const URL_CONSULTATION_CONFIRM = (id) =>
  `/consultation/consultation/${id}/confirm`;
export const URL_CONSULTATION_LIST = "/consultation/consultations";
// export const URL_COMMUNITY = TRIBE_BASE_URL;
export const URL_COMMUNITY = "/community";
export const URL_COMMUNITY_SHARE_POST = "/community/share-post";
export const URL_COMMUNITY_CREATE = "/community/create";
export const URL_CONDITIONS_PCOS = "/conditions/pcos";
export const URL_PROGRAMS = "/programs";
export const URL_PLANS_FORMAT = "/programs/[id]";
export const URL_PLANS = (id) => `/programs/${id}`;

export const URL_PLAN_PAYMENT_FORMAT = "/programs/purchase/[id]";
export const URL_PLAN_PAYMENT = (id) => `/programs/purchase/${id}`;
export const URL_MY_PROGRAMS = "/user/programs";
export const URL_MY_PERIODTRACKER = "/user/period-tracker";
export const URL_MY_PERIODTRACKER_EDIT =  "/user/period-tracker/editPage";
export const URL_MY_PERIODTRACKERRESULT = "/user/period-tracker-result";
export const URL_MY_ROTATINGCYCLE ="/user/rotating-circle";
export const URL_USER_PROGRAM_PROFILE_FORMAT = "/user/programs/[id]/profile";
export const URL_USER_PROGRAM_PROFILE = (id) => `/user/programs/${id}/profile`;
export const URL_USER_PROGRAM_DETAIL_FORMAT = `/user/programs/[id]`;
export const URL_USER_PROGRAM_DETAIL = (id) => `/user/programs/${id}`;
export const URL_USER_PROGRAM_PENDING_FORMAT = `/user/programs/[id]/pending`;
export const URL_USER_PROGRAM_PENDING = (id) => `/user/programs/${id}/pending`;

export const URL_USER_PROGRAM_SLOT_SELECTION_FORMAT =
  "/user/programs/[id]/consultation/[consultantId]/slot";
export const URL_USER_PROGRAM_SLOT_SELECTION = (id, consultantId) =>
  `/user/programs/${id}/consultation/${consultantId}/slot`;

export const URL_CONSULTATION_CHAT_FORMAT =
  "/consultation/consultation/[id]/message";
export const URL_CONSULTATION_CHAT = (id) =>
  `/consultation/consultation/${id}/message`;

export const URL_USER_MOBILE_VERIFICATION = `/user/mobileVerification`;
//FIXME remove this
// export const URL_QUERY_PARAMS_REDIRECT_TO = (redirectToUrl)=> `?redirectTo=${(redirectToUrl || '')}`;// prevent undefined coming in url
// export const URL_QUERY_REDIRECT_AFTER_LOGIN = (redirectToUrl) => {
//   return {redirectAfterLogin: redirectToUrl}
// };
export const URL_QUERY_REDIRECT_AFTER_LOGIN = `redirectTo`;
export const URL_TRIBE_COMMUNITY = "/user/tribe";

export const RAZORPAY_API_KEY = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
export const RAZORPAY_SCRIPT_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

export const STATIC_IMAGE = "/assets/images";

export const PROGRAM_IMAGES = {
  1: "pcos.png",
  2: "pcos.png",
  3: "hair_loss.png",
  4: "menopause.png",
  5: "acne.png",
};

export const SPECIALIZATION_IMAGES = {
  acne: `${STATIC_IMAGE}/acne.png`,
  "facial hair": `${STATIC_IMAGE}/facialhair.png`,
  hairloss: `${STATIC_IMAGE}/hairloss.png`,
  infertility: `${STATIC_IMAGE}/infertility2.png`,
  pcos: `${STATIC_IMAGE}/pcos.png`,
  periods: `${STATIC_IMAGE}/periods.png`,
};

export const PAYMENT_STATUS = {
  DRAFT: "DRAFT",
  CREATED: "CREATED",
  PAID: "PAID",
  CAPTURED: "CAPTURED",
};

export const DIET_TRACKER_URL = "/user/diet-tracker";
export const HEALTH_SCORE_START_URL = "/user/health-score/start";
export const HEALTH_SCORE_RESULT_URL = "/user/health-score/result";
export const HEALTH_SCORE_URL = "/user/health-score";
export const MYAVA_STUDIO_URL = "/studio";
export const STUDIO_TABS = ["ALL", "PCOS", "FERTILITY", "THYROID", "LIVE"];