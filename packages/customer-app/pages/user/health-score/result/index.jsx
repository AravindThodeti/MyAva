import React, { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import CircularProgressBar from "@/components/circularProgress";
import TipsCard from "@/components/tipsCard";
import { generateUuid } from "@/utils/UuidUtills";
import {
  localStorageKeys,
  getResultData,
  resultKeysInApiResponse,
} from "@/constants/healthScore";
import CircularLoader from "@/components/loader";
import { Button, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "next-share";
import CustomizedSnackbar from "@/components/snackBar";
import ConsultationV3 from "@/components/homepage/consultationv3";

const SHARE_MESSAGE = `YOU NEED TO CHECK THIS!
So there’s this app called MyAva that has a digital health score test for women. I took the test and I really think you should too!
Here’s the link to the app.
`;
const MYAVA_URL = "https://play.google.com/store/apps/details?id=in.myava.app";

const HealthScoreResult = () => {
  const [healthScoreResult, setHealthScoreResult] = useState("");
  const router = useRouter();
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let resultResponse;
    if (typeof window !== "undefined") {
      const savedApiResponse = localStorage.getItem(
        localStorageKeys.healthScoreResult
      );
      resultResponse = JSON.parse(savedApiResponse);
    }
    const healthScoreResult = getResultData(
      resultResponse,
      resultKeysInApiResponse
    );
    setHealthScoreResult(healthScoreResult);
  }, []);

  const handleClickRedirect = () => {
    router.push("/");
  };

  const handleClickCopy = () => {
    navigator.clipboard.writeText(MYAVA_URL).then(
      function () {
        setSnackBarOpen(true);
        setErrorMessage("Link copied to clipboard");
      },
      function () {
        setSnackBarOpen(true);
        setErrorMessage("Error in copying link");
      }
    );
  };

  return healthScoreResult ? (
    <div className={styles.healthScoreResult}>
      <div className={styles.resultCircleSection}>
        <div className={styles.startButtonSection}>
          <div className={styles.circleBig}>
            <CircularProgressBar
              inlineStyles={{ transform: "translate(10px, 10px)" }}
              progressColor={
                healthScoreResult.healthScore < 0 ? "#F22C1F" : "#48C07F"
              }
              scoreColor={
                healthScoreResult.healthScore < 0 ? "#F22C1F" : "#48C07F"
              }
              progressPercentage={
                (healthScoreResult.healthScore /
                  healthScoreResult.bestHealthScore) *
                100
              }
              bestHealthScore={healthScoreResult.bestHealthScore}
              currentHealthScore={healthScoreResult.healthScore}
              useCase="HEALTH_SCORE"
              border={"12px"}
              progressThickness={4.5}
              size={118}
              marginTop={"0px"}
            />
            <div className={`${styles.circle} ${styles.one}`}>
              <img
                src="/assets/images/healthScore/testTube.png"
                alt="test tube"
              />
            </div>
            <div className={`${styles.circle} ${styles.two}`}>
              <img src="/assets/images/healthScore/brain.png" alt="brain" />
            </div>
            <div className={`${styles.circle} ${styles.three}`}>
              <img src="/assets/images/healthScore/apple.png" alt="apple" />
            </div>
            <div className={`${styles.circle} ${styles.four}`}>
              <img
                src="/assets/images/healthScore/moleculeStructure.png"
                alt="molecular structure"
              />
            </div>
            <div className={`${styles.circle} ${styles.five}`}>
              <img
                src="/assets/images/healthScore/padWithCalender.png"
                alt="calendar"
              />
            </div>
            <div className={`${styles.circle} ${styles.six}`}>
              <img
                src="/assets/images/healthScore/htModuleIcons/weightingMachine.svg"
                alt="calendar"
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className={styles.title}>
        Target Health Score: {healthScoreResult.bestHealthScore}
      </h1>
      <div className={styles.message}>
        <p className={styles.messageGreeting}>
          The 6 Modules of your wellbeing!
        </p>
      </div>
      <div className={styles.bodyImage}>
        <img src="/assets/images/healthScore/bodyImage.png" alt="human body" />
      </div>
      <div className={styles.tips}>
        {healthScoreResult.moduleScore.map((moduleData, i) => {
          if (i == 1) {
            return (
              <>
                <TipsCard key={generateUuid()} {...moduleData} />
                <p className={styles.messageBody}>
                  Try improving your health score by 15% in the next 30 days.
                  Scroll down to know more about your health score.
                </p>
              </>
            );
          } else {
            return (
              <TipsCard
                marginBottom="45px"
                key={generateUuid()}
                {...moduleData}
              />
            );
          }
        })}
      </div>
      <div className={styles.notes}>
        <div className={styles.heading}>Note: </div>
        <div className={styles.notesText}>
          This is not a confirmative diagnostic test. Please confirm your
          findings with a blood test.
        </div>
      </div>
      <p className={styles.shareResultHeading}>Share Your Result</p>
      <div className={styles.shareButtons}>
        <WhatsappShareButton title={SHARE_MESSAGE} url={MYAVA_URL}>
          <img src="/assets/images/whatsAppIcon.svg" alt="whatsapp" />
        </WhatsappShareButton>
        <FacebookShareButton quote={SHARE_MESSAGE} url={MYAVA_URL}>
          <img src="/assets/images/faceBokIcon.svg" alt="facebook" />
        </FacebookShareButton>
        <TwitterShareButton url={MYAVA_URL} title={SHARE_MESSAGE}>
          <img src="/assets/images/twitter.svg" alt="twitter" />
        </TwitterShareButton>
      </div>
      <p className={styles.copyLinkHeading}>Or Copy Link</p>
      <div className={styles.copyToClipBoard}>
        {MYAVA_URL}
        <IconButton
          onClick={handleClickCopy}
          style={{
            background: "white",
            width: "25px",
            height: "25px",
            borderRadius: "0 4px 4px 0",
            borderLeft: "1px solid #B0B0B0",
            position: "absolute",
            right: 0,
          }}
        >
          <img src="/assets/images/copyIcon.svg" alt="copy" />
        </IconButton>
      </div>
      <div className={styles.homePageButton}>
        <Button
          onClick={handleClickRedirect}
          style={{
            background: "white",
            width: "200px",
            height: "33px",
            color: "#C43A5C",
            fontWeight: "500",
            fontSize: "18px",
            fontFamily: "Poppins",
            textTransform: "none",
            borderRadius: "27px",
            boxShadow: "-2px -2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Back to Home
        </Button>
      </div>
      <div className={styles.expertsSection}>
        <ConsultationV3
          showseeall={false}
          backgroundColor="#BC3756"
          headingColor="#FFFFFF"
          tabDefaultColor="rgba(255,255,255,0.8)"
          tabActiveColor="white"
          indicatorColor="white"
          spDetailColor="white"
        />
      </div>

      <CustomizedSnackbar
        open={isSnackBarOpen}
        message={errorMessage}
        setOpen={setSnackBarOpen}
      />
    </div>
  ) : (
    <CircularLoader />
  );
};

export default HealthScoreResult;
