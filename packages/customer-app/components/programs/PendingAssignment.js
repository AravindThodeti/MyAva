import * as React from "react";
import Typography from "@material-ui/core/Typography";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { Grid } from "@material-ui/core";

export default function PendingAssignment() {
  return (
    <>
      <CenterCircularProgress />
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={10}>
          <Typography variant="body1" gutterBottom>
            Congratulations on beginning your journey towards fighting back
            PCOS.
          </Typography>
          <Typography variant="body1">
            Here&apos;s how we&apos;ll begin:
          </Typography>
          <Typography variant="body1">
            1. You will receive a call from the team shortly(between 10am to
            7pm) to understand your health goals.
          </Typography>
          <Typography variant="body1">
            2. Based on your goals, your PCOS team will be assigned to you.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
