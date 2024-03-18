import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme/theme";
import AppHeaderBar from "../components/Header";
import { Provider } from "react-redux";
import { useStore } from "../store/storeConfig";
import "./mobileVerification.global.css"; // Import globally. Not with CSS modules.
import { checkIsAppHeaderVisibleForPath } from "@/utils/Utility";
import BottomNavigationBar from "@/components/bottomNavigation";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const { pathname } = useRouter();
  const [isAppHeaderVisible, setIsAppHeaderVisible] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const result = checkIsAppHeaderVisibleForPath(pathname);
    setIsAppHeaderVisible(result);
  }, [pathname]);

  return (
    <React.Fragment>
      <Head>
        <title>Ava</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          {pathname !== "/user/otpLogin" &&
            pathname !== "/user/signup" &&
            pathname !== "/user/login" && <BottomNavigationBar />}
          {/* <BottomNavigationBar /> */}
          {isAppHeaderVisible && <AppHeaderBar />}
          <Box
            style={
              pathname == "/user/login" ||
              pathname == "/user/otpLogin" ||
              pathname == "/user/signup" ||
              pathname == "/programs" ||
              pathname == `/programs/[id]`
                ? {
                    backgroundColor: "rgb(249, 249, 249)",
                    overflow: "scroll",
                  }
                : {
                    height: `calc(100vh - 56px)`,
                    backgroundColor: "rgb(249, 249, 249)",
                    overflow: "scroll",
                  }
            }
          >
            <div
              style={
                pathname == "/" ||
                pathname == "/programs" ||
                pathname == `/programs/[id]`
                  ? { paddingBottom: "56px" }
                  : { paddingBottom: "0px" }
              }
            >
              <Component {...pageProps} />
            </div>
          </Box>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
