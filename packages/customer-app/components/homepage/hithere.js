import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() => ({
  containerDiv: {
    backgroundColor: "#ee9caa",
    color: "#ffffff",
  },
  text: {
    fontSize: "0.9rem",
    fontWeight: 400,
  },
}));

export default function HiThere() {
  const classes = useStyles();
  return (
    <Box className={classes.containerDiv}>
      <Box p={2}>
        <Grid container direction="row" alignItems="flex-start" spacing={1}>
          <Grid item>
            <Avatar
              className="myava-welcome-logo"
              alt="my-ava"
              src={`${constant.STATIC_IMAGE}/myava_profile_image.png`}
            />
          </Grid>
          <Grid container item direction="column" xs={10}>
            <Grid item>
              <Typography className={`${classes.text} myava-welcome-message`}>
                Hi There!
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={`${classes.text} myava-welcome-message`}>
                Maintaining a balanced diet and a regular exercise regime is the
                key to balanced hormones. Start today!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
