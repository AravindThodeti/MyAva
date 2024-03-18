import * as constant from "../../../constants";

export const DEFAULT_DRAWER_NAV = [
  {
    text: "Health Programs",
    link: constant.URL_PROGRAMS,
    iconSrc: "healthPrograms",
  },
  { text: "PCOS Guide", link: constant.PCOS_GUIDE, iconSrc: "pcosGuideLogo" },
  {
    text: "Consult An Expert",
    link: constant.URL_CONSULTATION,
    iconSrc: "consult",
  },
  { text: "Community", link: constant.URL_COMMUNITY, iconSrc: "community" },
  { text: "Women Health Blogs", link: "/blogs", iconSrc: "healthBlogs" },
  { text: "Contact Us", link: "/contact-us", iconSrc: "communications" },
  { text: "About Us", link: "/about", iconSrc: "communications" },
];

export const AUTH_DRAWER_NAV = [
  { text: "Home", link: constant.URL_HOME },
  { text: "My Profile", link: constant.URL_PROFILE },
  { text: "My Consultations", link: constant.URL_CONSULTATION_LIST },
  { text: "My Programs", link: constant.URL_MY_PROGRAMS },

  // { text: "Period Tracker", link: constant.URL_MY_PERIODTRACKER },
  // {text:"rotating cycle", link: constant.URL_MY_ROTATINGCYCLE},

  {
    text: "Health Score Calculator",
    link: constant.HEALTH_SCORE_START_URL,
  },
  {
    text: "Diet Tracker",
    link: constant.DIET_TRACKER_URL,
  },
];


export const LOG_OUT_DRAWER_NAV_OBJ = {
  text: "Logout",
  link: constant.URL_LOGOUT,
  iconSrc: "logOut",
};

export default DEFAULT_DRAWER_NAV;
