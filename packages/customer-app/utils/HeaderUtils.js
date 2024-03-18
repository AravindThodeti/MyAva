import * as constant from "@/constants/index";

const headerOptions = (router) => {
  const options = {
    title: constant.APP_TITLE,
    backButton: false,
    showLogo: false,
  };
  switch (router.pathname) {
    case constant.URL_HOME:
      return {
        ...options,
        showLogo: true,
      };
    case constant.URL_LOGIN:
      return {
        ...options,
        title: "Login",
      };
    case constant.URL_PROFILE:
      return {
        ...options,
        title: "Profile",
      };
    case constant.URL_CONSULTATION:
      return {
        ...options,
        title: "Book Appointment",
      };
    case constant.URL_CONSULTATION_CONSULTANTS_FORMAT:
      return {
        ...options,
        title: router.query.department
          ? router.query.department
          : "Select Consultant",
        backButton: true,
      };
    case constant.URL_CONSULTATION_SLOT_FORMAT:
      return {
        ...options,
        title: "Select Slot",
        backButton: true,
      };
    case constant.URL_CONSULTATION_PAYMENT_FORMAT:
      return {
        ...options,
        title: "Payment",
        backButton: true,
      };
    case constant.URL_CONSULTATION_CONFIRM_FORMAT:
      return {
        ...options,
        title: "Confirm Profile",
      };
    case constant.URL_CONSULTATION_LIST:
      return {
        ...options,
        title: "My Consultations",
      };
    case constant.URL_CONSULTATION_CHAT_FORMAT:
      return {
        ...options,
        title: "Consultation",
        backButton: true,
      };
    case constant.URL_COMMUNITY:
      return {
        ...options,
        title: "PCOS Community",
      };
    case constant.URL_COMMUNITY_SHARE_POST:
      return {
        ...options,
        title: "Share Post",
        backButton: true,
      };
    case "/pcos-guide/[id]":
      return {
        ...options,
        showLogo: true,
      };
    case constant.URL_COMMUNITY_CREATE:
      return {
        ...options,
        title: "Create Post",
        backButton: true,
      };
    case constant.URL_CONDITIONS_PCOS:
      return {
        ...options,
        title: "Conditions",
      };
    case constant.URL_PROGRAMS:
      return {
        ...options,
        title: "Programs",
      };
    case constant.URL_PLANS_FORMAT:
      return {
        ...options,
        title: "Plans",
        backButton: true,
      };
    case constant.PCOS_GUIDE:
      return {
        ...options,
        showLogo: true,
      };
    case constant.URL_MY_PROGRAMS:
      return {
        ...options,
        title: "My Programs",
      };
    case constant.URL_PLAN_PAYMENT_FORMAT:
      return {
        ...options,
        title: "Payment",
        backButton: true,
      };
    case constant.URL_USER_PROGRAM_DETAIL_FORMAT:
      return {
        ...options,
        title: "My Program",
        backButton: true,
      };
    case constant.URL_USER_PROGRAM_PROFILE_FORMAT:
      return {
        ...options,
        title: "Profile",
      };
    case constant.URL_USER_PROGRAM_PENDING_FORMAT:
      return {
        ...options,
        title: "My Program",
      };
    case constant.DIET_TRACKER_URL:
      return {
        ...options,
        title: "Diet Tracker",
      };
    case constant.HEALTH_SCORE_START_URL:
      return {
        ...options,
        title: "Health Score",
      };
    case constant.HEALTH_SCORE_URL:
      return {
        ...options,
        title: "Health Score",
      };
    case constant.HEALTH_SCORE_RESULT_URL:
      return {
        ...options,
        title: "Health Score",
      };
    default:
      return options;
  }
};

export default headerOptions;
