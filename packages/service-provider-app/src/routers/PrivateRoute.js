import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import { URL_LOGIN } from "../constants/index";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Header />
          <div className="bodyComponent">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect to={URL_LOGIN} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.profileReducer.profile,
});

export default connect(mapStateToProps)(PrivateRoute);
