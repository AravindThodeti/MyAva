import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AvaImage from "../v1/Image";

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4f4f4f",
    margin: "15px 0px",
  },
}));

const DATA = [
  "My periods are so irregular. What foods can I eat for Hormonal balance?",
  "What kind of foods are good for Insulin resistance type of PCOS.",
  "I have started eating healthy now to reverse PCOS. I eat 2 fruits daily.",
];

export default function FilterTopics() {
  const classes = useStyles();
  return (
    <div
      style={{ backgroundColor: "#fff", padding: "15px", marginTop: "15px" }}
    >
      <div className={classes.heading}>Quick Post</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {DATA.map((datum, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            <AvaImage size="xsmall" name="quickPostQIcon" />
            <div style={{ padding: "0px 12px", flexGrow: 1 }}>{datum}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
