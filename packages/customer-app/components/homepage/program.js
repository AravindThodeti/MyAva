import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import * as constant from "@/constants/index";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(1),
  },
  parentGrid: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    backgroundImage: `url('${constant.STATIC_IMAGE}/program_background.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "65% 85%",
    backgroundPosition: "top right",
  },
  heading: {
    fontSize: "1.1rem",
    fontWeight: "600",
    paddingTop: theme.spacing(3),
  },
  featuresGrid: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  features: {
    fontSize: "0.80rem",
    lineHeight: "0.9rem",
    fontWeight: "600",
    color: "#3F3D56",
  },
  programButtonGrid: {
    marginTop: theme.spacing(2),
  },
  programButton: {
    marginTop: theme.spacing(1),
    fontWeight: "600",
    fontSize: "0.9rem",
    background:
      "linear-gradient(180deg, #ED2198 0%, #8C0442 82%, #89043F 100%)",
    maxHeight: "28px",
    marginLeft: theme.spacing(2),
  },
}));

export default function Program() {
  const classes = useStyles();

  return (
    <Box mt={0.3} ml={0.1} mr={0.1}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container className={classes.parentGrid}>
          <Grid
            container
            item
            xs={12}
            justify="space-evenly"
            direction="column"
            className={classes.parentGridContent}
          >
            <Grid item>
              <Typography className={classes.heading}>PCOS Program</Typography>
            </Grid>
            <Grid item className={classes.featuresGrid}>
              <Typography className={classes.features} gutterBottom>
                Unlimited diet consultations
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Fitness Plan
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Infertility Consultation
              </Typography>
              <Typography className={classes.features} gutterBottom>
                Facial hair and Acne Solutions
              </Typography>
            </Grid>
            <Grid item className={classes.programButtonGrid}>
              <Link
                href={constant.URL_PLANS_FORMAT}
                as={constant.URL_PLANS(1)}
                passHref={true}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.programButton}
                >
                  JOIN NOW
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
