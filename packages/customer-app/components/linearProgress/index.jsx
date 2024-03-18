import styles from "./LinearProgress.module.scss";
import { number, string } from "prop-types";
import React from "react";

const propTypes = {
  /** progress percentage  */
  progress: number,
  /** width of progress bar */
  progressBarWidth: string,
  /** height of progress bar */
  progressBarHeight: string,
  /** background of progress bar */
  progressBackGroundColor: string,
  /** color of progress */
  progressColor: string,
};

const LinearProgress = ({
  progress,
  progressBarWidth,
  progressBarHeight,
  progressBackGroundColor,
  progressColor,
}) => {
  return (
    <div
      className={styles.linearProgress}
      data-label=""
      style={{
        "--progress-width": progress,
        "--progress-bar-width": progressBarWidth,
        "--progress-bar-height": progressBarHeight,
        "--progress-bar-color": progressBackGroundColor,
        "--progress-color": progressColor,
      }}
    ></div>
  );
};

LinearProgress.propTypes = propTypes;
export default LinearProgress;
