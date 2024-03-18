import AvaImage from "@/components/v1/Image";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import styles from "./otplogin.module.scss";
import { generateOTPForLogin, validateOTPForLogin } from "@/utils/ApiUtils";
import { useRouter } from "next/router";
import * as constant from "@/constants/index";
import Link from "next/dist/client/link";
import { verifyByMobile } from "../../store/actions/api.action";
import { LS_ACCESS_TOKEN } from "@ava/common/lib/constants";

export default function OTPLogin() {
  const [otpLoginPage, setOTPLoginPage] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [otp, setOtp] = useState("");
  const [validateNumber, setValidateNumber] = useState("");
  const [validateMobileNoError, setValidateMobileNoError] = useState("");
  const [validateOTPError, setValidateOTPError] = useState("");
  const [resendOtpBtnAction, setResendOtpBtnAction] = useState(true);
  let count = 45;
  const [otpInterval, setOtpInterval] = useState(count);
  const router = useRouter();
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

  //setting timer to resend OTP
  const handleOtpCounter = () => {
    setResendOtpBtnAction(true);
    let interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
        setResendOtpBtnAction(false);
      }
      setOtpInterval(count);
      count -= 1;
    }, 1000);
  };

  // validate mobile number and generate OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateNumber && validateNumber.match(/^[6-9]{1}[0-9]{9}$/)) {
      setValidateMobileNoError("");
      setMobileNumber(validateNumber);
      let generateOTPViaMobileNumber = {
        to: {
          mobile: "+91" + validateNumber,
        },
      };
      const otpResponse = await generateOTPForLogin(
        generateOTPViaMobileNumber
      ).catch((err) => console.log("generateOTP", err));

      if (otpResponse && otpResponse.data) {
        setVerifyId(otpResponse.data.verify_id);
      }
      setOTPLoginPage(true);
      window?.scrollTo(0, 0);
      handleOtpCounter();
    } else {
      setValidateMobileNoError("Enter valid 10 digit mobile number");
    }
  };

  //generate OTP for ResendOTP
  const handleOTPResend = async (e) => {
    e.preventDefault();
    setValidateOTPError("");
    setOtp("");
    setResendOtpBtnAction(false);
    let generateOTPViaMobileNumber = {
      to: {
        mobile: "+91" + mobileNumber,
      },
    };
    const otpResponse = await generateOTPForLogin(
      generateOTPViaMobileNumber
    ).catch((err) => console.log("generateOTP", err));
    if (otpResponse && otpResponse.data) {
      setVerifyId(otpResponse.data.verify_id);
    }
    handleOtpCounter();
  };

  //validate OTP and login to home page
  const handleOTPValidate = async (e) => {
    e.preventDefault();
    let verifyOTPDetails;
    if (otp) {
      verifyOTPDetails = {
        mobile_number: mobileNumber,
        verify_id: verifyId,
        otp: otp,
      };
    }
    let isValidOTP = false;
    let isExistingUser = false;
    await validateOTPForLogin(verifyOTPDetails)
      .then((res) => {
        isExistingUser = res;
        localStorage.setItem("mobilenumber", mobileNumber);
        if (isExistingUser) {
          //to get user details
          verifyByMobile(mobileNumber)
            .then(() => {
              router
                .replace({
                  pathname: constant.HEALTH_SCORE_START_URL,
                })
                .then(() => window.scrollTo(0, 0));
            })
            .catch((err) => {
              console.log("failed at verifyMobile", err);
            });
        } else {
          router.push({
            pathname: constant.URL_SIGNUP,
            query: mobileNumber,
          });
        }
      })
      .catch((err) => {
        isValidOTP = true;
        console.log("validateError", err);
      });
    if (isValidOTP) {
      setValidateOTPError("Invalid OTP");
    }
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", paddingTop: "30px" , fontSize:"16px"}}
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
      <div className={styles.background}>
        <div style={{ marginTop: "30px" }}>
          {otpLoginPage ? (
            <div>
              <div className={styles.heading}>Enter Code</div>
              <div className={styles.subheading}>
                We have sent you an SMS on +91 {mobileNumber} with a 6-digit
                verification code (OTP)
              </div>
              <div className={styles.otpPage}>
                <TextField
                  label="Enter 6 digit OTP"
                  variant="filled"
                  type="number"
                  value={otp}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtp(e.target.value);
                  }}
                  className={styles.OtpPassword}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                ></TextField>
                <div className={styles.validationMsg}>
                  <p className={styles.errorMsg}>{validateOTPError}</p>
                  <div className={styles.otp}>
                    <button
                      className={styles.resendButton}
                      disabled={resendOtpBtnAction == true ? true : false}
                      onClick={handleOTPResend}
                      style={{
                        textDecoration: resendOtpBtnAction
                          ? "none"
                          : "underline",
                      }}
                    >
                      Resend OTP{" "}
                    </button>
                    <p className={styles.OtpCounter}> in {otpInterval} sec</p>
                  </div>
                  <button className={styles.button} onClick={handleOTPValidate}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.heading}>Enter mobile no</div>
              <div className={styles.subheading}>
                It will just take a few minutes register your mobile no
              </div>
              <div className={styles.spaceBetweenInputsAndButton}>
                <div className={styles.spaceBetweenInputs}>
                  <input
                    type="text"
                    defaultValue="+91"
                    size="3"
                    className={styles.countryCodeInput}
                  />
                  <input
                    type="number"
                    value={validateNumber}
                    className={styles.numberInputFeild}
                    onChange={(e) => {
                      e.preventDefault();
                      setValidateNumber(e.target.value);
                    }}
                  />
                </div>
                <p className={styles.errormsg}>{validateMobileNoError}</p>

                <button className={styles.button} onClick={handleSubmit}>
                  Continue
                </button>
                <Link href="./login">
                  <b style={{ color: "white", textDecoration: "underline" }}>
                    Need help ? Try another way.
                  </b>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
