import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import Link from "next/link";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Paper, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundImage: `url('${constant.STATIC_IMAGE}/plans_background.png')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    zIndex: 1,
  },
  paper: {
    zIndex: 2,
    background:
      "linear-gradient(97deg, rgba(245,7,115, 0.95) 0%, rgba(255,80,80,0.85) 100%)",
    borderRadius: 4,
    color: "#ffffff",
  },
  parentGrid: {
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  leftFeatureGrid: {
    marginTop: theme.spacing(1),
  },
  features: {
    fontSize: "0.80rem",
    lineHeight: "0.9rem",
    fontWeight: "600",
  },
  buttonGrid: {
    marginTop: theme.spacing(1),
  },
  button: {
    fontSize: "0.75rem",
    lineHeight: "0.9rem",
    fontWeight: "600",
    color: "#ffffff",
    textTransform: "capitalize",
    paddingLeft: "0",
  },
  divider: {
    backgroundColor: "#ffffff",
    width: "2px",
    height: "80%",
  },
}));

export default function Plans() {
  const classes = useStyles();
  return (
    <Box mt={1} ml={0.6} mr={0.6} className={classes.box}>
      <Link href={constant.URL_PROGRAMS} passHref={true}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container className={classes.parentGrid}>
            <Grid
              container
              item
              xs={5}
              direction="column"
              justify="space-between"
            >
              <Grid item>
                <Typography className={classes.heading}>
                  Women health program
                </Typography>
              </Grid>
              <Grid item className={classes.leftFeatureGrid}>
                <Typography className={classes.features}>
                  Solve the problem, not the symptom
                </Typography>
              </Grid>
              <Grid
                container
                item
                className={classes.buttonGrid}
                alignItems="center"
              >
                <Link href={constant.URL_PROGRAMS} passHref={true}>
                  <Button
                    className={classes.button}
                    variant="text"
                    endIcon={<ArrowRightAltIcon />}
                  >
                    View Plans Now
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container item xs={2} justify="center" alignContent="center">
              <Divider className={classes.divider} orientation="vertical" />
            </Grid>
            <Grid container item xs={5} direction="column">
              <Typography className={classes.features} gutterBottom>
                Polystic Ovaries
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Hair Loss
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Acne
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Thyroid
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Urinary tract infection
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Irregular Periods
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Box>
  );
}
