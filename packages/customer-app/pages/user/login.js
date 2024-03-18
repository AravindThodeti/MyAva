import { useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import { GOOGLE_AUTH_URL, OAUTH2_REDIRECT_URI } from "../../constants";
import AvaImage from "@/components/v1/Image";
import Link from "next/link";
import { string } from "prop-types";
import styles from "./otplogin.module.scss";

export default function Login({ redirectTo }) {
  const mobileImg = { width: "300px", marginTop: "15px", cursor: "pointer" };
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const message = router.query.message;
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  let googleHref = GOOGLE_AUTH_URL + OAUTH2_REDIRECT_URI;
  if (redirectTo) {
    googleHref += `?extra_params=${redirectTo}`;
  }
  const loginGrid = (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "30px" }}
    >
      <div
        style={{
          margin: "30px",
          display: "flex",
          justifyContent: "center",
        }}
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

      <div className={styles.gradientBg}>
        <div className={styles.heading} style={{ fontSize: "36px" }}>
          Login
        </div>
        <div className={styles.subheading}>
          You&apos;re one step closer to being a part of India&apos;s biggest
          club of PCOS fighters!
        </div>
        <div>
          <Link href={googleHref}>
            <AvaImage size="social" name="googleLogIn" />
          </Link>
        </div>
        <div>
          <Link href="./otpLogin">
            <img style={mobileImg} src="/assets/images/mobileNum.svg" />
          </Link>
        </div>
      </div>
    </div>
  );

  const snackBar = (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
  ``;
  if (process.browser) {
    //runing on client (not server SSR)
    const isLoggedIn = !!window.localStorage.accessToken;
    if (isLoggedIn) {
      if (redirectTo && redirectTo != "undefined") {
        router.push(redirectTo);
      } else {
        router.back();
      }
      return <></>;
    }
  }

  return (
    <div>
      {loginGrid}
      {message ? snackBar : <></>}
    </div>
  );
}
Login.propTypes = {
  redirectTo: string,
};
Login.getInitialProps = async ({ query }) => {
  const { redirectTo } = query;
  return { redirectTo };
};
