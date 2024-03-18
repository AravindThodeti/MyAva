import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export default function RadioWithOther({ question, setAnswer }) {
  const [value, setValue] = React.useState("");
  const [other, setOther] = React.useState("");

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOtherChange = (event) => {
    setOther(event.target.value);
  };

  const handleSubmitClick = () => {
    const answer = {};
    if (value == "Other") {
      answer[question.label.name] = other;
    } else {
      answer[question.label.name] = value;
    }
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
        row
        aria-label={question.label.label}
        name={question.label.name}
        value={value}
        onChange={handleOnChange}
      >
        {question.options.map((opt, index) => (
          <FormControlLabel
            key={index}
            control={<Radio color="primary"/>}
            value={opt}
            label={opt}
          />
        ))}
        <FormControlLabel value="Other" control={<Radio color="primary"/>} label="Other" />
      </RadioGroup>
      {value == "Other" && (
        <TextField value={other} onChange={handleOtherChange} label="Other" />
      )}
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
