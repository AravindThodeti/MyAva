import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function Select({ question, setAnswer }) {
  const [value, setValue] = React.useState([]);

  const handleOnClick = (v) => {
    if (value.includes(v)) {
      setValue(value.filter((item) => item !== v));
    } else {
      setValue([...value, v]);
    }
  };

  const handleSubmitClick = () => {
    const answer = {};
    if (!question.optional) {
      if (value.length === 0) {
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

  return (
    <Box>
      <Grid container spacing={1} justify="flex-start" alignItems="center">
        {question.options.map((opt, index) => (
          <Grid item key={index}>
            <Paper
              style={{ padding: 4 }}
              elevation={value.includes(opt) ? 0 : 3}
              onClick={() => handleOnClick(opt)}
            >
              <Typography>{opt}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center" spacing={2}>
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
              {question.optionalText ? question.optionalText : "Skip"}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
