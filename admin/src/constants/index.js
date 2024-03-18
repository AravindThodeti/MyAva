export const APP_NAME = "AVA";

export const URL_SETTINGS = "/settings";
export const URL_LOGIN = "/";
export const URL_OAUTH_REDIRECT = "/oauth2/redirect";
export const URL_DASHBOARD = "/dashboard";

export const LS_ACCESS_TOKEN = "accessToken";
export const LS_CURRENT_USER = "currentUser";
export const LS_SP_PROFILE = "serviceProviderProfile";
export const LS_ADMIN_PROFILE = "adminProfile";

export const API_BASE_URL = "http://localhost:8090";
export const OAUTH2_REDIRECT_URI = "http://localhost:3001" + URL_OAUTH_REDIRECT;
export const API_VERSION_URL = API_BASE_URL + "/api/v1";
export const GOOGLE_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/google?user_type=service_provider&redirect_uri=" +
  OAUTH2_REDIRECT_URI;
