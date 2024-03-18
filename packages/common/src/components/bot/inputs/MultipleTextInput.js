import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function MultipleTextInput({ question, setAnswer }) {
  const getReferenceKey = (question, label) => {
    return `${question.id}-${label.name}`;
  };
  const references = {};
  question.labels.forEach((label) => {
    references[getReferenceKey(question, label)] = React.useRef(null);
  });

  const handleSubmitClick = () => {
    let answer = {};
    for (let i = 0; i < question.labels.length; i++) {
      const extractedAnswer = references[
        getReferenceKey(question, question.labels[i])
      ].current.value.trim();
      if (extractedAnswer.length == 0) {
        return;
      }
      answer[question.labels[i].name] = extractedAnswer;
      setAnswer(question, answer);
    }
  };

  return (
    <Grid container spacing={1} justify="space-evenly" alignItems="center">
      {question.labels.map((label, index) => (
        <Grid item key={index} xs={12 / (question.labels.length + 1)}>
          <TextField
            inputRef={references[getReferenceKey(question, label)]}
            label={label.label}
            name={label.name}
          />
        </Grid>
      ))}
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
  );
}
