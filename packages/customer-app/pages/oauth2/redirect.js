import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import * as constant from "@/constants/index";
import { addSeconds } from "date-fns";
import { LS_ACCESS_TOKEN, LS_TOKEN_EXPIRY } from "@ava/common";
import { getCustomerProfile } from "@/store/actions/api.action";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { object, func } from "prop-types";

const propTypes = {
  query: object,
  dispatch: func,
};

class OAuth2RedirectHandler extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    const token = this.props.query.token;
    const error = this.props.query.error;
    const expiry = this.props.query.expiry;
    const redirect = this.props.query.extra_params;
    console.log("redirect handler redirect", redirect);
    console.log("referrer", document.referrer);
    if (token) {
      localStorage.setItem(LS_ACCESS_TOKEN, token);
      if (expiry) {
        let currentDate = new Date();
        currentDate = addSeconds(currentDate, parseInt(expiry) - 60);
        localStorage.setItem(LS_TOKEN_EXPIRY, currentDate.toISOString());
      }
      const customerProfile = await this.props.dispatch(getCustomerProfile());

      if (!customerProfile.mobile) {
        Router.replace({
          pathname: constant.URL_USER_MOBILE_VERIFICATION,
          query: { [constant.URL_QUERY_REDIRECT_AFTER_LOGIN]: redirect[0] },
        });
      } else {
        if (redirect) {
          Router.replace({
            pathname: redirect[0],
          });
        } else {
          Router.replace({
            pathname: constant.HEALTH_SCORE_START_URL,
          })
          .then(() => window.scrollTo(0, 0));
        }
      }
    } else if (error) {
      Router.replace({
        pathname: constant.URL_LOGIN,
        query: { message: error },
      });
    }
  }

  render() {
    return <CenterCircularProgress />;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

OAuth2RedirectHandler.propTypes = propTypes;
export default connect(mapStateToProps)(OAuth2RedirectHandler);
