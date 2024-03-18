import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import Link from "next/link";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(1),
    backgroundColor: "transparent",
  },
  heading: {
    color: "#000000",
    fontSize: "1rem",
    fontWeight: "600",
  },
  features: {
    color: "#3F3D56",
    fontSize: "0.8rem",
    fontWeight: "700",
  },
  communityButton: {
    fontWeight: "600",
    fontSize: "0.8rem",
    maxHeight: "32px",
    background:
      "linear-gradient(180deg, #ED2198 0%, #8C0442 82%, #89043F 100%)",
  },
}));

export default function Community() {
  const classes = useStyles();

  return (
    <Box ml={0.5} mr={0.5} mt={1} className={classes.box}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container>
          <Grid item xs={5}>
            <img
              height="170px"
              src={`${constant.STATIC_IMAGE}/community_background.png`}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid
            container
            item
            xs={6}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.heading} gutterBottom>
                Got a question?
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.features} gutterBottom>
                Discuss your doubts with fellow women.
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.features} gutterBottom>
                Join the Ava community now!
              </Typography>
            </Grid>
            <Grid item>
              <Link href={constant.URL_COMMUNITY} passHref={true}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.communityButton}
                >
                  Join Now
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
