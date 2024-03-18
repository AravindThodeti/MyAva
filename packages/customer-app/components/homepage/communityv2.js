import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import * as constant from "@/constants/index";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  box: {
    background:
      "linear-gradient(270deg, rgb(231, 41, 87, .62) 0%, rgb(189, 23, 113) 100%)",
    color: "white",
    height: "200px",
  },
  image: {
    backgroundImage: `url('${constant.STATIC_IMAGE}/community_v2_background.png')`,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
  },
  message: {
    fontSize: "1.1rem",
  },
  heading: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginLeft: theme.spacing(1),
  },
  tag: {
    fontSize: "0.9rem",
  },
  subtitle: {
    fontSize: "0.95rem",
  },
}));

export default function CommunityV2() {
  const classes = useStyles();
  return (
    <Box m={2} borderRadius={8} className={classes.box}>
      <Link href={constant.URL_COMMUNITY} passHref={true}>
        <Box className={classes.image} p={2}>
          <Typography className={classes.message}>
            Let's spread awareness
          </Typography>
          <Box display="flex" alignItems="baseline">
            <Typography className={classes.message}>this</Typography>
            <Typography className={classes.heading}>September!</Typography>
          </Box>
          <Typography className={classes.tag}>#pcosfighter</Typography>
          <Typography className={classes.subtitle}>
            Join the PCOS community
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
