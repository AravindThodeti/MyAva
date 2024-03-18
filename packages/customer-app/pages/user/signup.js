import AvaImage from "@/components/v1/Image";
import * as constant from "@/constants/index";
import { saveUserByMobileVerification } from "../../store/actions/api.action";
import styles from "./otplogin.module.scss";
import { useState,useEffect } from "react";
import { LS_ACCESS_TOKEN } from "@ava/common/lib/constants";
import router from "next/router";

const Signup = () => {
  const [errMessage, setErrMessage] = useState("");
  const [errMessageName, setErrMessageName] = useState("");

  function handleClick(e) {
    e.preventDefault();
    let emailTest = /\S+@\S+\.\S+/;
    let emailValue = document.getElementById("email").value;
    let nameValue = document.getElementById("name").value;
    let emailCon = false,
      nameCon = false;
    !emailTest.test(emailValue)
      ? setErrMessage("Enter valid Email")
      : (setErrMessage(""), (emailCon = true));
    nameValue === ""
      ? setErrMessageName("Enter Name")
      : (setErrMessageName(""), (nameCon = true));
    if (emailCon && nameCon) {
      let userDetails = {
        email: emailValue,
        name: nameValue,
        user_type: "CUSTOMER",
        mobile_number: localStorage.getItem("mobilenumber"),
      };
      saveUserByMobileVerification(userDetails).then(() => {
        router.replace({
          pathname: constant.URL_HOME,
        });
      });
    }
  }
  // redirect to home page if token exists
  useEffect(() => {
    const token = localStorage.getItem(LS_ACCESS_TOKEN);
    if (token) {
      router
        .replace({
          pathname: constant.HEALTH_SCORE_START_URL,
        })
        .then(() => window.scrollTo(0, 0));
    }
  }, []);

  const signupInput = {
    width: "300px",
    height: "56px",
    borderRadius: "7px",
    border: "none",
    display: "block",
    marginTop: "15px",
    textAlign: "center",
  };
  const signupButton = {
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "30px",
  };
  const errorMessageStyle = {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  };
  return (
    <div className={styles.signUpPage}>
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
      <div className={styles.background}>
        <div>
          <div className={styles.heading}>Sign up</div>
          <div className={styles.subheading}>
            You&apos;re one step closer to being a part of India&apos;s biggest
            club of PCOS fighters!
          </div>
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Enter your Name"
              id="name"
              style={signupInput}
              minLength="5"
            />
            <p style={errorMessageStyle}>{errMessageName}</p>
            <input
              type="text"
              placeholder="Enter your Email"
              id="email"
              style={signupInput}
              autofocus
            />
            <p style={errorMessageStyle}>{errMessage}</p>

            <button
              type="submit"
              style={{ ...signupInput, ...signupButton }}
              onClick={handleClick}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
