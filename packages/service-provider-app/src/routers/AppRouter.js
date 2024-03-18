import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "components/LoginPage";
import OAuthRedirectHandler from "components/OAuthRedirectHandler";
import Profile from "components/profile/Profile";
import Logout from "components/Logout";
import Schedule from "components/Timings";
import ConsultationList from "components/ConsultationList";
import UserConsultationList from "components/UserConsultationList";
import HomePage from "components/HomePage";
import {
  URL_LOGIN,
  URL_HOMEPAGE,
  URL_OAUTH_REDIRECT,
  URL_CONSULTATION,
  URL_CONSULTATION_LIST,
  URL_PROFILE,
  URL_SCHEDULE,
  URL_LOGOUT,
  URL_USER_PROGRAMS_LIST,
} from "../constants";
import ConsultationDetail from "components/ConsultationDetail";
import UserProgramList from "components/UserProgramList";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <PublicRoute path={URL_HOMEPAGE} component={HomePage} exact={true} />
        <PublicRoute path={URL_LOGIN} component={LoginPage} />
        <PublicRoute
          path={URL_OAUTH_REDIRECT}
          component={OAuthRedirectHandler}
        />
        <PublicRoute path={URL_LOGOUT} component={Logout} />
        <PrivateRoute path={URL_PROFILE} component={Profile} />
        <PrivateRoute path={URL_SCHEDULE} component={Schedule} />
        <PrivateRoute path={URL_CONSULTATION} component={ConsultationDetail} />

        <PrivateRoute
          path={URL_CONSULTATION_LIST}
          component={UserConsultationList}
        />
        <PrivateRoute
          path={URL_USER_PROGRAMS_LIST}
          component={UserProgramList}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
