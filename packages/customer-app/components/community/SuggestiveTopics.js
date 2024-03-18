import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AvaImage from "../v1/Image";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4f4f4f",
    margin: "15px 0px",
  },
}));

const DATA = [
  {
    id: 1,
    description: "PCOS",
    iconSrc: "pcos2",
  },
  {
    id: 2,
    description: "Irregular Periods",
    iconSrc: "irregularPeriods",
  },
  {
    id: 3,
    description: "Infertility",
    iconSrc: "infertility",
  },
  {
    id: 4,
    description: "Hair Loss",
    iconSrc: "hairLoss",
  },
];

export default function SuggestiveTopics() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div>
      <div className={classes.heading}>Suggestive Topics</div>
      <div style={{ display: "flex", overflow: "scroll" }}>
        {DATA.map((datum, index) => (
          <div
            onClick={() => {
              router.push("/community/share-post");
            }}
            key={index}
            style={{
              padding: "5px",
              marginRight: "15px",
              marginBottom: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AvaImage size="medium" name={datum.iconSrc} />
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                fontSize: "14px",
                color: "#4f4f4f",
              }}
            >
              {datum.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
