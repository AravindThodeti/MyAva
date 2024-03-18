import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

export default function MultipleNumberSelect({ question, setAnswer }) {
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
      const extractedAnswer =
        references[getReferenceKey(question, question.labels[i])].current.value;
      if (!extractedAnswer || extractedAnswer.length == 0) {
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
          <InputLabel id={label.name}>{label.label}</InputLabel>
          <Select
            labelId={label.name}
            inputRef={references[getReferenceKey(question, label)]}
            label={label.label}
            name={label.name}
            autoWidth
          >
            {label.options.map((opt, index) => (
              <MenuItem key={index} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
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
