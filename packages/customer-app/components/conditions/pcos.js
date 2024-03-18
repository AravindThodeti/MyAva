import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as constant from "@/constants/index";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Advertisement from "../programs/Advertisement";
import ReactHtmlParser from "react-html-parser";
import { string } from "prop-types";

const propTypes = {
  content: string,
};

const useStyles = makeStyles((theme) => ({
  cover: {
    minHeight: "20vh",
    backgroundColor: "#F6C5BE",
    marginTop: theme.spacing(1),
    borderRadius: 10,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
  },
  coverContent: {
    width: "70%",
    marginTop: "auto",
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  coverTitle: {
    color: "#89043F",
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  coverSubHeading: {
    fontSize: "0.95rem",
    fontWeight: 400,
  },
  coverSubtitle: {
    fontSize: "0.80rem",
  },
  coverImage: {
    backgroundImage: `url(${constant.STATIC_IMAGE}/conditions/pcos/pcos.png)`,
    backgroundRepeat: "no-repeat",
    width: "30%",
    backgroundSize: "cover",
  },
  content: {
    margin: theme.spacing(3),
  },
  contentQuestion: {
    fontSize: "1rem",
  },
  contentAnswer: {
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1),
  },
}));

const PCOS = ({ content }) => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.cover}>
        <Box className={classes.coverContent}>
          <Typography variant="h4" className={classes.coverTitle}>
            PCOS
          </Typography>
          <Typography variant="h6" className={classes.coverSubHeading}>
            Poly Cystic Ovarian Syndrome
          </Typography>
          <Typography
            variant="caption"
            className={classes.coverSubtitle}
            gutterBottom
          >
            Details of the Program to be inserted here. Lifestyle changes have
            been
          </Typography>
        </Box>
        <Box className={classes.coverImage}></Box>
      </Box>
      <Box className={classes.content}>
        <Box>{ReactHtmlParser(content)}</Box>
      </Box>
      <Advertisement />
    </Box>
  );
};
PCOS.propTypes = propTypes;
export default PCOS;
