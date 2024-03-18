import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { makeStyles } from "@material-ui/core";
import { array } from "prop-types";
const useStyles = makeStyles({
  root: {
    color: "#9b1a58",
    backgroundColor: "#9b1a58",
  },
});

const separatorStyles = makeStyles({
  root: {
    // border: '1px solid red'
  },
});

const itemStyles = makeStyles({
  root: {
    // border: '1px solid blue',
    "&::before": {
      display: "none",
    },
  },
});

const connectorStyles = makeStyles({
  root: {
    color: "#d3d3d3",
    width: "1px",
  },
});

const propTypes = {
  data: array,
};
const AvaTimeline = ({ data }) => {
  const classes = useStyles();
  const separatorClasses = separatorStyles();
  const connectorClasses = connectorStyles();
  const itemClasses = itemStyles();
  return (
    <Timeline style={{ margin: "0px", paddingLeft: "0px" }} align="left">
      {data.map((datum, index) => (
        <TimelineItem key={index} className={itemClasses.root}>
          <TimelineSeparator className={separatorClasses.root}>
            <TimelineDot className={classes.root} />
            <TimelineConnector className={connectorClasses.root} />
          </TimelineSeparator>
          <TimelineContent>
            <div style={{ fontSize: "14px", color: "#4f4f4f" }}>
              {datum.title}
            </div>
            {datum.description && (
              <div style={{ fontSize: "14px", color: "#4f4f4f" }}>
                {datum.description}
              </div>
            )}
            {datum.list && (
              <ol>
                {datum.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
AvaTimeline.propTypes = propTypes;
export default AvaTimeline;
