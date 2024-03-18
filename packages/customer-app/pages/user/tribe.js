import React from "react";
import Router from "next/router";
import { getTribeToken } from "@ava/common/lib/utils/ApiUtils";
import * as constant from "@/constants/index";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { TRIBE_LOGIN_REDIRECTION_URL } from "@ava/common";

export default function Tribe() {
  const [tribeToken, setTribeToken] = React.useState(null);

  React.useEffect(() => {
    if (!tribeToken) {
      getTribeToken()
        .then((res) => {
          setTribeToken(res.token);
        })
        .catch((e) => {
          console.log(e);
          Router.replace(constant.URL_HOME);
        });
    }
  }, []);

  if (tribeToken) {
    Router.replace(TRIBE_LOGIN_REDIRECTION_URL(tribeToken));
  }

  return <CenterCircularProgress />;
}
