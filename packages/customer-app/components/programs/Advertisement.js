import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as constant from "@/constants/index";
import Box from "@material-ui/core/Box";
import { Typography, Button } from "@material-ui/core";
import Link from "next/link";
import { string } from "prop-types";

const useStyles = makeStyles((theme) => ({
  advertisement: {
    display: "flex",
    margin: theme.spacing(3),
    background:
      "linear-gradient(97deg, rgba(245,7,115,1) 0%, rgba(255,80,80,0.93) 100%)",
    borderRadius: 10,
    padding: theme.spacing(2),
    color: "#ffffff",
  },
  advertisementAction: {
    width: "50%",
    marginTop: theme.spacing(0.5),
    paddingLeft: "4%",
    padingRight: theme.spacing(0.5),
  },
  advertisementContent: {
    width: "50%",
    borderLeft: "3px solid white",
    paddingLeft: theme.spacing(1.5),
  },
  advertisementContentText: {
    fontSize: "0.9rem",
    fontWeight: "400",
  },
  advertisementButton: {
    color: "#D40A63",
    backgroundColor: "#ffffff",
  },
  actionTitle: {
    fontSize: "1rem",
    fontWeight: "500",
    marginTop: theme.spacing(0.5),
  },
  actionSubtitle: {
    fontSize: "0.75rem",
    fontWeight: "400",
    marginBottom: theme.spacing(0.5),
  },
}));

const propTypes = {
  c2a: string,
};
const Advertisement = ({ c2a = "button" }) => {
  const classes = useStyles();

  const getC2A = (c2a) => {
    if (c2a === "button") {
      return (
        <Button
          variant="contained"
          size="small"
          disableElevation={true}
          color="inherit"
          className={classes.advertisementButton}
        >
          Join Now
        </Button>
      );
    } else {
      return (
        <Button variant="text" size="small" color="inherit">
          View Plans Now
        </Button>
      );
    }
  };
  return (
    <Box className={classes.advertisement}>
      <Box className={classes.advertisementAction}>
        <Typography className={classes.actionTitle}>
          PCOS Lifestyle Program
        </Typography>
        <Typography className={classes.actionSubtitle}>
          WIN PCOS NATURALLY
        </Typography>
        <Link
          href={constant.URL_PLANS_FORMAT}
          as={constant.URL_PLANS(1)}
          passHref={true}
        >
          {getC2A(c2a)}
        </Link>
      </Box>
      <Box className={classes.advertisementContent}>
        <Typography className={classes.advertisementContentText}>
          Doctor Consultation
        </Typography>
        <Typography className={classes.advertisementContentText}>
          Nutrition Plan
        </Typography>
        <Typography className={classes.advertisementContentText}>
          Fitness routine
        </Typography>
        <Typography className={classes.advertisementContentText}>
          Facial Hair solutions
        </Typography>
        <Typography className={classes.advertisementContentText}>
          Hair Loss solutions
        </Typography>
      </Box>
    </Box>
  );
};
Advertisement.propTypes = propTypes;
export default Advertisement;
