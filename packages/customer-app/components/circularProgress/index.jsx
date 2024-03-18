import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import styles from "./CircularProgress.module.scss";
import { number, string, object, bool } from "prop-types";
import { generateUuid } from "../../utils/UuidUtills";

const propTypes = {
  /** current progress od the user */
  progressPercentage: number,
  /** number of badges */
  noOfBadges: number,
  /** color of progress */
  progressColor: string,
  /**color for the health score text */
  scoreColor: string,
  /** best health score */
  bestHealthScore: number,
  /** current health score */
  currentHealthScore: number,
  /** size of the progress */
  size: number,
  /** thickness for the progress border in px */
  border: string,
  /** use case of the component */
  useCase: string /** GOAL_TRACKER | HEALTH_SCORE | HEALTH_SCORE_BREAKDOWN */,
  /** image link for the module */
  moduleImage: string,
  /** top margin for the progress */
  marginTop: string,
  /** thickness of the progress */
  progressThickness: number,
  /** inline styles */
  inlineStyles: object,
  /** innertext font size */
  innerTextFontSize: string,
  /** boolean to denote if user has given the health score before */
  isTestedBefore: bool,
};
//TODO: Refactor the component

const TOTAL_NO_OF_BADGES = 5;
const CircularProgressBar = ({
  progressPercentage,
  noOfBadges,
  dayNumType,
  progressColor,
  scoreColor,
  currentHealthScore,
  currentDayCount,
  phaseName,
  size,
  border,
  useCase,
  moduleImage,
  marginTop,
  progressThickness,
  inlineStyles,
  innerTextFontSize,
  bestHealthScore,
  isTestedBefore,
}) => {
  const renderComponentAsPerUseCase = (useCase) => {
    switch (useCase) {
      case "GOAL_TRACKER":
        return (
          <>
            <span className={styles.todaysGoalText}>{"Today's Goals"}</span>
            <span
              className={styles.todaysGoalProgressNumber}
            >{`${progressPercentage}%`}</span>
            <div className={styles.progressBadges}>
              {Array.from(Array(noOfBadges).keys()).map(() => (
                <img
                  key={generateUuid()}
                  src="/assets/images/dietTracker/progressBadge.png"
                  alt="progress badge"
                />
              ))}
              {Array.from(Array(TOTAL_NO_OF_BADGES - noOfBadges).keys()).map(
                () => (
                  <img
                    key={generateUuid()}
                    src="/assets/images/dietTracker/progressEmptyBadge.png"
                    alt="progress badge"
                  />
                )
              )}
            </div>
          </>
        );
      case "HEALTH_SCORE":
        return (
          <div className={styles.healthScore}>
            <span
              style={{ color: scoreColor, fontSize: innerTextFontSize }}
              className={styles.scoreValue}
            >
              {currentHealthScore}
            </span>
          </div>
        );
      case "HEALTH_SCORE_HOMEPAGE_DASHBOARD":
        return (
          <div className={styles.healthScoreHomePage}>
            {isTestedBefore ? (
              <span style={{ color: scoreColor }} className={styles.scoreValue}>
                {currentHealthScore}
              </span>
            ) : (
              <span style={{ color: "#F22C1F" }} className={styles.scoreValue}>
                ?
              </span>
            )}
            <hr className={styles.ruler} />
            <span className={styles.bestScore}>{bestHealthScore}</span>
          </div>
        );
      case "MODULE_HEALTH_SCORE_WITH_IMAGE":
        return (
          <div className={styles.moduleImage}>
            <img src={moduleImage} alt="health score module" />
          </div>
        );
      case "MODULE_HEALTH_SCORE":
        return (
          <div className={styles.moduleHealthScore}>
            <span style={{ color: scoreColor }} className={styles.scoreValue}>
              {currentHealthScore}
            </span>
          </div>
        );
      case "PERIOD_TRACKER":
        return (
          <div className={styles.healthScore}>
            <span
              style={{ color: scoreColor, fontSize: innerTextFontSize }}
              className={styles.scoreValue}
            >
              <label>{phaseName}</label>
              <span className={styles.dayCount}>
                {currentDayCount} <span className={styles.dayType}>{dayNumType}</span>
              </span>
              <span className={styles.day}>day of cycle</span>
            </span>
          </div>
        );
    }
  };

  return (
    <div>
      <Box
        style={{
          zIndex: 1,
          marginTop: marginTop,
          display: "flex",
          justifyContent: "center",
          ...inlineStyles,
        }}
        position="relative"
        display="inline-flex"
      >
        <CircularProgress
          style={{
            "stroke-linecap": "round",
            color: progressColor,
          }}
          thickness={progressThickness}
          variant="determinate"
          value={progressPercentage}
          size={size}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
          className={styles.circularProgressContent}
        >
          {renderComponentAsPerUseCase(useCase)}
        </Box>
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            border: `${border} solid #d6d6d6`,
          }}
          className={styles.circularProgressBackGround}
        ></div>
      </Box>
    </div>
  );
};
CircularProgressBar.defaultProps = {
  noOfBadges: -1,
  progressColor: "#28A745",
  scoreColor: "#4E4E4E",
  bestHealthScore: 210,
  currentHealthScore: 0,
  size: 150,
  border: "8.3px",
  moduleImage: "/assets/images/healthScore/redApple.png",
  marginTop: "40px",
  progressThickness: 2.5,
  inlineStyles: {},
  innerTextFontSize: "35px",
};

CircularProgressBar.propTypes = propTypes;
export default CircularProgressBar;
