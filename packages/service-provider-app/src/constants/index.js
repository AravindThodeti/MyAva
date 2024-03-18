import { API_BASE_URL } from "@ava/common";

export const APP_NAME = "AVA Care";

export const URL_HOMEPAGE = "/";
export const URL_SETTINGS = "/settings";
export const URL_PROFILE = "/profile";
export const URL_SCHEDULE = "/schedule";
export const URL_LOGIN = "/user/login";
export const URL_LOGOUT = "/user/logout";
export const URL_OAUTH_REDIRECT = "/oauth2/redirect";
export const URL_CONSULTATION_LIST = "/consultations";
export const URL_CONSULTATION = "/consultations/:id";
export const URL_CONSULTATION_GET = (id) => `/consultations/${id}`;
export const URL_USER_PROGRAMS_LIST = "/user/programs";

export const LS_ACCESS_TOKEN = "accessToken";
export const LS_CURRENT_USER = "currentUser";
export const LS_SP_PROFILE = "serviceProviderProfile";
export const LS_LATEST_MESSAGE_ID = "latestMessageId";
export const LS_LAST_GROUP_ID = "lastGroupId";
export const LS_FCM_TOKEN = "fcmToken";

export const OAUTH2_REDIRECT_URI =
  process.env.REACT_APP_BASE_URL + URL_OAUTH_REDIRECT;
export const API_VERSION_URL = API_BASE_URL + "/api/v1";
export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/google?user_type=service_provider&redirect_uri=" +
  OAUTH2_REDIRECT_URI;

export const LANGUAGES = ["ENGLISH", "HINDI", "KANNADA", "TAMIL", "TELUGU"];
export const SPECIALIZATIONS = [
  "ACNE",
  "HAIRLOSS",
  "FACIAL HAIR",
  "PCOS",
  "INFERTILITY",
  "PERIODS",
];
