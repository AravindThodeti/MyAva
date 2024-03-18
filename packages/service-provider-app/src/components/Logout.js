import * as React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { URL_LOGIN } from "../constants/index";
import * as userAction from "../store/actions/user.action";

export default function Logout() {
  const dispatch = useDispatch();
  localStorage.clear();
  dispatch(userAction.fetchUserSuccess(null));
  dispatch(userAction.fetchSPProfileSuccess(null));
  return (
    <Redirect
      to={{
        pathname: URL_LOGIN,
      }}
    />
  );
}
