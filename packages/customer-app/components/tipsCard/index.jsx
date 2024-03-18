import React from "react";
import styles from "./TipsCard.module.scss";
import CircularProgressBar from "../circularProgress";
import { number, string } from "prop-types";

const propTypes = {
  /** score for the module */
  moduleScore: number,
  /** best score for the module */
  bestScore: number,
  /** module name */
  moduleName: string,
  /** tips to improve the score */
  tipsText: string,
  /** module picture link */
  moduleImage: string,
  /** bottom margin for the card */
  marginBottom: string,
};

function TipsCard({
  moduleScore,
  bestScore,
  moduleName,
  tipsText,
  moduleImage,
  marginBottom,
}) {
  return (
    <div style={{ marginBottom: marginBottom }} className={styles.tipsCard}>
      <div className={styles.circularValue}>
        <CircularProgressBar
          progressColor={moduleScore < 0 ? "#F22C1F" : "#48C07F"}
          scoreColor={moduleScore < 0 ? "#F22C1F" : "#48C07F"}
          progressPercentage={(moduleScore / bestScore) * 100}
          bestHealthScore={bestScore}
          currentHealthScore={moduleScore}
          useCase="MODULE_HEALTH_SCORE"
          size={60}
          border={"5px"}
          moduleImage={moduleImage}
          progressThickness={3.5}
        />
      </div>
      <span className={styles.moduleScore}>
        <span className={styles.bestScore}>Max Score: {bestScore}</span>
      </span>
      <div className={styles.tipsForModules}>
        <h1 className={styles.moduleName}>{moduleName}</h1>
        <p className={styles.tipsText}>{tipsText}</p>
      </div>
    </div>
  );
}

TipsCard.propTypes = propTypes;
export default TipsCard;
