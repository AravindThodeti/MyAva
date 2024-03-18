import "date-fns";
import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function TimeRange({ question, setAnswer }) {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const handleFromDateChange = (d) => {
    setFromDate(d);
  };

  const handleToDateChange = (d) => {
    setToDate(d);
  };

  const handleSubmitClick = () => {
    const answer = {};
    if (fromDate && toDate) {
      answer[question.label.name] = {
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      };
      setAnswer(question, answer);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" alignItems="center">
        <KeyboardTimePicker
          margin="normal"
          label="From"
          KeyboardButtonProps={{
            "aria-label": "From Time",
          }}
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <KeyboardTimePicker
          margin="normal"
          label="To"
          KeyboardButtonProps={{
            "aria-label": "To time",
          }}
          value={toDate}
          onChange={handleToDateChange}
        />
        <Grid container justify="center" item xs={12}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmitClick}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
