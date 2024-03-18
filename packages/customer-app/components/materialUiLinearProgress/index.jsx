import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { number, string } from "prop-types";

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

const MuiLinearProgress = ({
  progress,
  progressBarWidth,
  progressBarHeight,
  progressBackGroundColor,
  progressColor,
}) => {
  const BorderLinearProgress = withStyles(() => ({
    root: {
      height: progressBarHeight,
      borderRadius: 5,
      width: progressBarWidth,
    },
    colorPrimary: {
      backgroundColor: progressBackGroundColor,
    },
    bar: {
      borderRadius: 5,
      backgroundColor: progressColor,
    },
  }))(LinearProgress);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        variant={
          typeof progress !== "undefined" ? "determinate" : "indeterminate"
        }
        value={progress}
      />
    </div>
  );
};

MuiLinearProgress.propTypes = propTypes;
export default MuiLinearProgress;
