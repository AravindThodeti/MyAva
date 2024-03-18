import "date-fns";
import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { QUESTION_TYPE } from "../../../constants";

export default function DateSelect({ question, setAnswer }) {
  const [date, setDate] = React.useState(null);

  const handleDateChange = (d) => {
    setDate(d);
  };

  const handleSubmitClick = () => {
    const answer = {};
    answer[question.label.name] = date.toISOString();
    setAnswer(question, answer);
  };

  let views = ["year", "month", "date"];
  let format = "dd-MM-yyyy";

  if (question.questionType == QUESTION_TYPE.YEAR_SELECT) {
    views = ["year"];
    format = "yyyy";
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" alignItems="center">
        <KeyboardDatePicker
          disableFuture
          openTo="year"
          format={format}
          margin="normal"
          views={views}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={date}
          onChange={handleDateChange}
        />
        <Grid item>
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
