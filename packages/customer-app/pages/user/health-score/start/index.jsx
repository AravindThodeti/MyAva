import React from "react";
import styles from "./Start.module.scss";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { cleanPreviousHealthScoreResults } from "@/constants/healthScore";
import { useSelector } from "react-redux";
import FlashLoader from "@/components/flashLoader";

const StartHealthScore = () => {
  const router = useRouter();
  const profile = useSelector((state) => state.profileReducer.profile);
  const handleClick = (e) => {
    e.preventDefault();
    cleanPreviousHealthScoreResults();
    router.push("/user/health-score");
  };

  return (
    <div className={styles.startHealthScore}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.logo}>
          <img src="/assets/images/healthScore/myavalogo.svg" alt="logo" />
        </div>

        <Button
          style={{
            background: "#C73B5D",
            width: "90px",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
            fontFamily: "Lato, sans-serif",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          SKIP
        </Button>
      </div>

      <div className={styles.welcomeMessage}>
        <span className={styles.welcomeName}>
          Welcome {profile ? `${profile.name} !` : <FlashLoader />}
        </span>{" "}
        <br />
        <span className={styles.message}>
          Take a quick health <br /> assessment test for a <br />
          <span className={styles.bold}>free Diet Consultation!</span>
        </span>
      </div>
      <div className={styles.startButtonSection}>
        <div className={styles.circleBig}>
          <Button
            onClick={handleClick}
            style={{
              background:
                "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
              width: "110px",
              height: "110px",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif",
              textTransform: "none",
              borderRadius: "50%",
              position: "absolute",
              transform: "translate(25px, 15px)",
              boxShadow:
                "0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
            }}
          >
            Start Test
          </Button>
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
  );
};

export default StartHealthScore;
