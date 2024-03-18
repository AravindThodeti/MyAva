import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  URL_LOGIN,
  URL_USER_PROGRAMS_LIST,
  URL_PROFILE,
} from "../constants/index";

export default function HomePage() {
  const profile = useSelector((state) => state.profileReducer.profile);
  const isServiceWorkerInitialized = useSelector(
    (state) => state.swReducer.serviceWorkerInitialized
  );
  const isServiceWorkerUpdated = useSelector(
    (state) => state.swReducer.serviceWorkerUpdated
  );
  const serviceWorkerRegistration = useSelector(
    (state) => state.swReducer.serviceWorkerRegistration
  );

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" });

      registrationWaiting.addEventListener("statechange", (e) => {
        if (e.target.state === "activated") {
          window.location.reload();
        }
      });
    }
  };

  if (isServiceWorkerUpdated) {
    return (
      <Button variant="outlined" onClick={updateServiceWorker}>
        A new version of the app is available.
      </Button>
    );
  }

  if (profile && profile !== null) {
    if (profile.activated_on !== null) {
      return <Redirect to={{ pathname: URL_USER_PROGRAMS_LIST }} />;
    } else {
      return <Redirect to={{ pathname: URL_PROFILE }} />;
    }
  }
  return (
    <Redirect
      to={{
        pathname: URL_LOGIN,
      }}
    />
  );
}
