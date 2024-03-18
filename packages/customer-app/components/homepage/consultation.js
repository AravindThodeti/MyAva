import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import Link from "next/link";
import { Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    borderRadius: theme.spacing(1.5),
  },
  paper: {
    borderRadius: theme.spacing(1.5),
  },
  headingParentGrid: {
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  featuresGrid: {
    marginTop: theme.spacing(2),
  },
  features: {
    fontSize: "0.80rem",
    lineHeight: "0.9rem",
    fontWeight: "600",
    color: "#3F3D56",
  },
  buttonParentGrid: {
    backgroundImage: `url('${constant.STATIC_IMAGE}/consultation_background.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center 10%",
    borderRadius: theme.spacing(1.5),
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: theme.spacing(2.5),
  },
  consultationButton: {
    marginBottom: theme.spacing(1),
    fontWeight: "600",
    fontSize: "0.7rem",
    textTransform: "capitalize",
    background:
      "linear-gradient(180deg, #ED2198 0%, #8C0442 82%, #89043F 100%)",
  },
}));
const Consultation = () => {
  const classes = useStyles();

  return (
    <Box mt={1} ml={0.6} mr={0.6} boxShadow={3} className={classes.box}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container className={classes.parentGrid}>
          <Grid
            container
            item
            xs={6}
            direction="column"
            justify="flex-end"
            alignItems="flex-start"
            className={classes.buttonParentGrid}
          >
            <Grid item xs={8} className={classes.buttonGrid}>
              <Link href={constant.URL_CONSULTATION} passHref={true}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.consultationButton}
                >
                  Consult Now
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.headingParentGrid}>
            <Grid container item direction="column">
              <Grid item>
                <Typography className={classes.heading}>
                  Consult a specialist
                </Typography>
              </Grid>
              <Grid item className={classes.featuresGrid}>
                <Typography className={classes.features} gutterBottom>
                  Polycystic ovaries
                </Typography>
                <Typography className={classes.features} gutterBottom>
                  Harmonal Imbalance
                </Typography>
                <Typography className={classes.features} gutterBottom>
                  Thyroid
                </Typography>
                <Typography className={classes.features} gutterBottom>
                  Vaginal Infections
                </Typography>
                <Typography className={classes.features} gutterBottom>
                  Irregular Periods
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

  // return (
  //   <Box className={classes.consultation}>
  //     <Box className={classes.consultationContent}>
  //       <Typography className={classes.consultationTitle} gutterBottom>
  //         Consult a specialist
  //       </Typography>
  //       <Typography className={classes.consultationSubTitle} gutterBottom>
  //         Irregular Cycle
  //       </Typography>
  //       <Typography className={classes.consultationSubTitle} gutterBottom>
  //         UTI
  //       </Typography>
  //       <Typography className={classes.consultationSubTitle} gutterBottom>
  //         Painful Period
  //       </Typography>
  //       <Link href={constant.URL_CONSULTATION} passHref={true}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           size="small"
  //           className={classes.consultationButton}
  //         >
  //           Consult Now
  //         </Button>
  //       </Link>
  //     </Box>
  //     <Box className={classes.consultationImageWrap}>
  //       <img
  //         className={classes.consultationImage}
  //         src={`${constant.STATIC_IMAGE}/consultation.png`}
  //       />
  //     </Box>
  //   </Box>
  // );
};

export default Consultation;
