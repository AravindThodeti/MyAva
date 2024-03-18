import React from "react";
import { URL_LOGIN, URL_CONSULTATION_LIST, URL_PROFILE } from "../constants";
import { LS_ACCESS_TOKEN, LS_TOKEN_EXPIRY } from "@ava/common";
import { Redirect } from "react-router-dom";
import { addSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getServiceProviderProfile } from "../store/actions/api.action";
import { fetchSPProfileFailure } from "../store/actions/user.action";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";

export default function OAuthRedirectHandler() {
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  const expiry = authResult.get("expiry");
  const error = authResult.get("error");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  if (token) {
    localStorage.setItem(LS_ACCESS_TOKEN, token);
    if (expiry) {
      let currentDate = new Date();
      currentDate = addSeconds(currentDate, parseInt(expiry) - 30);
      localStorage.setItem(LS_TOKEN_EXPIRY, currentDate.toISOString());
    }
    if (!profile) {
      dispatch(getServiceProviderProfile());
    } else if (profile && profile.activated_on !== null) {
      return (
        <Redirect
          to={{
            pathname: URL_CONSULTATION_LIST,
          }}
        />
      );
    } else if (profile && profile.activated_on === null) {
      return (
        <Redirect
          to={{
            pathname: URL_PROFILE,
          }}
        />
      );
    }
  }

  if (error) {
    dispatch(fetchSPProfileFailure(error));
    return (
      <Redirect
        to={{
          pathname: URL_LOGIN,
        }}
      />
    );
  }
  return <CenterCircularProgress />;
}
