import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Radio as MuRadio} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Radio({ question, setAnswer }) {
  const [value, setValue] = React.useState("");

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmitClick = () => {
    const answer = {};
    answer[question.label.name] = value;
    if (!question.optional) {
      if (answer[question.label.name].length === 0) {
        return;
      }
    }
    setAnswer(question, answer);
  };

  const handleSkip = () => {
    const answer = {};
    answer[question.label.name] = null;
    setAnswer(question, answer);
  };

  return (
    <Box>
      <RadioGroup
        aria-label={question.label.label}
        name={question.label.name}
        value={value}
        onChange={handleOnChange}
      >
        {question.options.map((opt, index) => (
          <FormControlLabel
            key={index}
            control={<MuRadio color="primary"/>}
            value={opt}
            label={opt}
          />
        ))}
      </RadioGroup>
      <Grid container justify="center" style={{ marginTop: 8 }}>
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
    </Box>
  );
}
