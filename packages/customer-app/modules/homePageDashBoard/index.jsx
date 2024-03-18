import React, {useState, useEffect } from "react";
import styles from "./HomePageDashBoard.module.scss";
import CircularProgressBar from "@/components/circularProgress";
import { Button } from "@material-ui/core";
import GoodForItem from "../../modules/goodForItem";
import { generateUuid } from "@/utils/UuidUtills";
import ConsistencyCard from "@/components/consistencyCard";
import { string, bool, array, number ,object} from "prop-types";
import { useRouter } from "next/router";
import * as constant from "@/constants/index";


const GREEN_COLOR_FOR_HS_RESULT = "#47C07E";
const RED_COLOR_FOR_HS_RESULT = "#F22C1F";

const propTypes = {
  /** boolean to denote if user has given the health score before */
  isTestedBefore: bool,
  /** name of the user */
  userName: string,
  /** diet consistency data */
  dietConsistency: array,
  /** best health score */
  bestHealthScore: number,
  /** user health score */
  userHealthScore: number,
  /** get last period details */
  lastPeriodTackerData: array,
   /** get next period details */
   nexttPeriodTackerData: array,
};

function HomePageDashBoard({
  isTestedBefore,
  userHealthScore,
  bestHealthScore,
  userName,
  dietConsistency,
  lastPeriodTackerData,
  nexttPeriodTackerData
}) {
  const progressPercentage = (userHealthScore / bestHealthScore) * 100;
  const [isPeriodTrackerDataAvailable ,setIsPeriodTrackerDataAvailable]=useState(false);
  const progressColor =
    userHealthScore > 0 ? GREEN_COLOR_FOR_HS_RESULT : RED_COLOR_FOR_HS_RESULT;
  const scoreColor =
    userHealthScore > 0 ? GREEN_COLOR_FOR_HS_RESULT : RED_COLOR_FOR_HS_RESULT;

  const router = useRouter();
  const handleClickTrackYourDiet = () => {
    router.push("/user/diet-tracker");
  };
  const handleClickHealthScoreTest = () => {
    router.push("/user/health-score/start");
  };
  

  const handleButton =() =>{
    router.push(constant.URL_MY_PERIODTRACKER)
  }

const PeriodTrackerComponent = () =>{
  console.log("array",lastPeriodTackerData)
  return  lastPeriodTackerData.length===0 ?
  (
    <div className={styles.consistencyCardNoTracker} >
      <div className={styles.noTrackerContent}>
        <span>
        <p>Keep track of<br/> your cycles</p>
        </span>
      <div className={styles.verticalLine}></div>
        <span>
        <Button onClick={handleButton}>setup period tracker</Button> 
        </span>
      </div>

    </div>
  ) : (
    <div className={styles.consistencyCard} onClick={handleButton}>
      <img src="/assets/images/periodTracker/previousPeriodHome.png" height="25" width="32"/>
      <div className={styles.trackerContent}>
        <p>Previous Period</p> 
        <p>{lastPeriodTackerData[2] +" " +lastPeriodTackerData[1] }</p>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.trackerContent}>
        <p>Next Period</p>
        <p>{nexttPeriodTackerData[2]+" "+nexttPeriodTackerData[1]}</p>
      </div>
      <img src="/assets/images/periodTracker/nextPeriodHome.png" height="25" width="32"/>

    </div>
  )
}

  return (
    <div className={styles.homePageDashBoard}>
      <div className={styles.topUserInfo}>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <img src="/assets/images/defaultAvatar.svg" alt="user" />
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
        <div className={styles.healthScoreInfo}>
          <div className={styles.healthScore}>
            <CircularProgressBar
              progressColor={progressColor}
              scoreColor={scoreColor}
              progressPercentage={progressPercentage}
              bestHealthScore={bestHealthScore}
              currentHealthScore={userHealthScore}
              useCase={"HEALTH_SCORE_HOMEPAGE_DASHBOARD"}
              border={"6px"}
              progressThickness={4}
              size={80}
              innerTextFontSize={"16px"}
              marginTop={"0px"}
              isTestedBefore={isTestedBefore}
            />
          </div>
          <div className={styles.retestButton}>
            <Button
              style={{
                fontSize: "12px",
                backgroundColor: "white",
                width: "70px",
                height: "18px",
                borderRadius: "40px",
                color: "#C93B5D",
                textTransform: "none",
                fontWeight: "600",
                boxShadow: "0px 2.01093px 4.02186px rgba(0, 0, 0, 0.15)",
              }}
              onClick={handleClickHealthScoreTest}
            >
              {isTestedBefore ? "Retest" : "Test"}
            </Button>
          </div>
        </div>
      </div>
      <div  className={styles.weeklyConsistency}>
      <div className={styles.heading}>
        <div className={styles.periodTrackerName}>
        <span><h1>Period Tracker</h1></span><span><img
            src="/assets/images/periodTracker/Menstrual cup.svg"
            alt="menstrual cup"
          ></img> </span>
        </div>
         
         <PeriodTrackerComponent /> 
        </div>
      </div>
      <div className={styles.weeklyConsistency}>
        <div className={styles.heading}>
          <h1>Your Weekly Consistency</h1>
          <ConsistencyCard dietConsistency={dietConsistency} />
        </div>
      </div>
      <p className={styles.consistencyMessage}>
        Consistency is key to achieve any goal. Free diet plan for 15 days.
      </p>
      <div className={styles.dietTrackerButtonContainer}>
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "white",
            width: "132px",
            height: "40px",
            borderRadius: "40px",
            color: "#C93B5D",
            textTransform: "none",
            fontWeight: "600",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          }}
          onClick={handleClickTrackYourDiet}
        >
          Track your Diet
        </Button>
      </div>
    </div>
  );
}
HomePageDashBoard.propTypes = propTypes;
export default HomePageDashBoard;
