import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function NumberInput({ question, setAnswer }) {
  const [value, setValue] = React.useState("");

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmitClick = () => {
    const answer = {};
    if (!question.optional) {
      if (value.trim().length == 0) {
        return;
      }
    }
    answer[question.label.name] = value;
    setAnswer(question, answer);
  };

  const handleSkip = () => {
    const answer = {};
    answer[question.label.name] = null;
    setAnswer(question, answer);
  };

  const getSize = () => {
    if (question.optional) {
      return 4;
    } else {
      return 6;
    }
  };

  return (
    <Grid container spacing={1} justify="space-evenly" alignItems="center">
      <Grid item xs={getSize()}>
        <TextField
          label={question.label.label}
          name={question.label.name}
          value={value}
          onChange={handleOnChange}
          type="number"
        />
      </Grid>
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
      {question.optional && (
        <Grid item>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
