/* eslint-disable no-unused-vars */
import React from "react";
import AvaImage from "@/components/v1/Image";
import Link from "@material-ui/core/Link";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomerProfile,
  updateProfile,
} from "../../store/actions/api.action";
import * as constant from "@/constants/index";
import Router, { useRouter } from "next/router";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFfTB3Eyhd03l61mbSvSqsJsp0xEp6RvE",
  authDomain: "myava.in",
  databaseURL: "https://inspired-micron-277104.firebaseio.com",
  projectId: "inspired-micron-277104",
  storageBucket: "inspired-micron-277104.appspot.com",
  messagingSenderId: "48736844865",
  appId: "1:48736844865:web:980dda15ddb2ec363f1ac0",
};
// Initialize Firebase
const firebaseApp = firebase.apps[0] || firebase.initializeApp(firebaseConfig); // if there is an initialized app, use it

export default function MobileVerification() {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectTo = router.query[constant.URL_QUERY_REDIRECT_AFTER_LOGIN];

  const firebaseAuthUiConfig = {
    signInFlow: "redirect",
    immediateFederatedRedirect: true,
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image", // 'audio'
          size: "normal", // 'invisible' or 'compact'
          badge: "bottomleft", //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: "IN",
      },
    ],
    // signInSuccessUrl: constant.URL_HOME, //TODO redirect to "query param" redirecTo from this.proper.location
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        //can't make this async function
        console.log("mobileVerification successful");
        console.log(authResult, redirectUrl);

        const defaultProfileData = {
          title: "Mrs",
          weight: 50,
        };

        dispatch(getCustomerProfile()).then((profile) => {
          // eslint-disable-next-line no-debugger
          debugger;
          const updatedProfileData = {
            // ...defaultProfileData,
            // ...profile,
            // mobile_verified_on: new Date().toISOString(),
            mobile: authResult.user.phoneNumber.slice(-10), //get the last 10 digits as this is strictly India only for now
          };

          dispatch(updateProfile(profile.id, updatedProfileData)).then(
            (updatedProfileFromServer) => {
              // debugger;

              if (redirectTo && redirectTo !== "undefined") {
                //redirect to the redirecTo page
                router.replace({
                  pathname: redirectTo,
                });
              } else {
                //redirect to home
                Router.replace({
                  pathname: constant.HEALTH_SCORE_START_URL,
                })
                .then(() => window.scrollTo(0, 0));
              }
            }
          );
        });

        return false; //required by firebaseui
      },
    },
  };

  const mobileVerificationUi = (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "30px" }}
    >
      <div
        style={{ margin: "30px", display: "flex", justifyContent: "center" }}
      >
        <img
          style={{ width: "96px", height: "24px" }}
          src="/assets/images/myAvaLogoV2.svg"
          alt="logo"
        />
      </div>
      <div style={{ margin: "30px" }}>
        <AvaImage size="loginSvg" src="/assets/images/loginBg.svg" />
      </div>
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 330px)",
          justifyContent: "flex-end",
          borderRadius: "120px 0px 0px 0px",
          alignItems: "center",
          padding: "15px",
          flexDirection: "column",
          background:
            "linear-gradient(117.44deg, #F8B1B5 -11.58%, #CD3C5D 33.68%, #CD3C5D 64.67%, #8B2B61 110.68%), linear-gradient(142.58deg, #EB6F91 0.9%, #D84982 101.19%)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Enter mobile number
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#fff",
              textAlign: "center",
              marginBottom: "15px",
              // marginTop: "15px",
            }}
          >
            It will just take a few minutes register your mobile no
          </div>
        </div>
        <div>
          {/* <AvaImage size="social" name="fbLogIn" /> */}
          <StyledFirebaseAuth
            uiConfig={firebaseAuthUiConfig}
            // firebaseAuth={firebase.auth()}
            firebaseAuth={firebaseApp.auth()}
          />
        </div>
      </div>
    </div>
  );

  return mobileVerificationUi;
}
