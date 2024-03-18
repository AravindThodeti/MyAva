import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export default function SelectWithOther({ question, setAnswer }) {
  const [value, setValue] = React.useState([]);
  const [other, setOther] = React.useState("");

  const handleOnChange = (event) => {
    if (value.includes(event.target.name)) {
      setValue(value.filter((item) => item !== event.target.name));
    } else {
      setValue([...value, event.target.name]);
    }
  };

  const handleOtherChange = (event) => {
    setOther(event.target.value);
  };

  const handleSubmitClick = () => {
    const answer = {};
    if (other) {
      answer[question.label.name] = [...value, other];
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
      <FormGroup row>
        {question.options.map((opt, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={value.includes(opt)}
                onChange={handleOnChange}
                name={opt}
                color="primary"
              />
            }
            label={opt}
          />
        ))}
        <TextField value={other} onChange={handleOtherChange} label="Other" />
      </FormGroup>
      <Grid container justify="center" style={{marginTop: 8}}>
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
