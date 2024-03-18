import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import { AvaImageV1 } from "../v1/Image";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(() => ({
  carousel: {
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: "1.4rem",
    color: "#4f4f4f",
    fontWeight: 700,
  },
  box: {
    height: "180px",
    borderLeft: "4px solid #ab1466",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
  },
  itemTitle: {
    fontSize: "1.1rem",
    color: "#4f4f4f",
    fontWeight: "600",
  },
  itemTopic: {
    fontSize: "0.8rem",
    color: "#4f4f4f",
  },
  itemButton: {
    color: "#ffffff",
    textTransform: "capitalize",
    background:
      "linear-gradient(90deg, rgb(234, 98, 147) 0%, rgb(228, 73, 157) 100%)",
  },
}));

export default function ProgramV2() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("sm"));
  const matchessm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const matchesmd = useMediaQuery(theme.breakpoints.up("md"));
  const matcheslg = useMediaQuery(theme.breakpoints.up("lg"));

  let height, name;
  if (matchesxs) {
    height = `calc(40vh)`;
    name = "pcosProgramV2_";
  }
  if (matchessm) {
    height = `calc(50vh)`;
    name = "pcosProgramV2_Web";
  }
  if (matchesmd) {
    height = `calc(100vh)`;
    name = "pcosProgramV2_Web";
  }
  // if (matcheslg) {
  //   height = `calc(100vh)`;
  //   name = "pcosProgramV2_Web";
  // }
  if (matcheslg) {
    height = `calc(100vh)`;
    name = "pcosProgramV3_Web";
  }

  return (
    <Box style={{ marginTop: -1 * theme.spacing(0.5) }}>
      <Carousel
        animation="fade"
        className={classes.carousel}
        activeIndicatorProps={{ style: { color: "#dd66a6" } }}
        interval={5000}
        timeout={50}
        navButtonsAlwaysInvisible={true}
      >
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            style={!matcheslg ? { height: `calc(${height} - 100px)` } : null}
          >
            <AvaImageV1
              onClick={() => {
                router.push(constant.URL_PROGRAMS);
              }}
              size="homePcosBanner"
              name={name + item}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
}
