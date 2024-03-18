import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { QUESTION_TYPE, CONSENT_NO_QUESTIONS, CONSENT_QUESTION_IDS } from "../../../constants";

const FOR_QUESTION = (profile) => {
  return {
    id: CONSENT_QUESTION_IDS.CONSULTATION_FOR,
    questionType: QUESTION_TYPE.RADIO,
    question: `Is this consultation for ${profile?.name}?`,
    options: ["Yes", "No"],
    label: { label: "Consultation for", name: "consultation_for" },
  };
};

const SPEAKING_TO_QUESTION = (
  profile,
  questionType = QUESTION_TYPE.CONSENT
) => {
  return {
    id: CONSENT_QUESTION_IDS.SPEAKING_TO,
    questionType: questionType,
    question: `Am I speaking to ${profile?.name}?`,
    options: ["Yes", "No"],
    label: { label: "Speaking to", name: "speaking_to" },
  };
};

const CONSULTATION_FOR = ({ value, handleOnChange }) => (
  <Box>
    <RadioGroup value={value} onChange={handleOnChange}>
      <FormControlLabel
        control={<Radio color="primary" />}
        value={"Yes"}
        label={"Yes"}
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value={"No"}
        label={"No"}
      />
    </RadioGroup>
  </Box>
);

const SPEAKING_TO = ({ value, handleOnChange }) => (
  <Box>
    <RadioGroup value={value} onChange={handleOnChange}>
      <FormControlLabel
        control={<Radio color="primary" />}
        value={"Yes"}
        label={"Yes"}
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value={"No"}
        label={"No"}
      />
    </RadioGroup>
  </Box>
);

export default function Consent({
  question,
  setAnswer,
  questions,
  setQuestions,
  profile,
}) {
  const [consultationFor, setConsultationFor] = React.useState(null);
  const [speakingTo, setSpeakingTo] = React.useState(null);
  if (!question.id) {
    question.id = CONSENT_QUESTION_IDS.CONSULTATION_FOR;
  }

  const handleForChange = (event) => {
    setConsultationFor(event.target.value);
  };

  const handleSpeakingToChange = (event) => {
    setSpeakingTo(event.target.value);
  };

  const handleForSubmitClick = (value) => {
    if (value == "Yes") {
      const answer = {};
      answer[question.label.name] = value;
      const q1 = FOR_QUESTION(profile);
      q1.answer = answer;
      const newQuestions = [q1, SPEAKING_TO_QUESTION(profile)];
      setQuestions(newQuestions);
    } else {
      const answer = {};
      answer[question.label.name] = value;
      const q1 = FOR_QUESTION(profile);
      q1.answer = answer;
      const newQuestions = [q1, ...CONSENT_NO_QUESTIONS];
      setQuestions(newQuestions);
    }
  };

  const handleSpeakingToSubmitClick = (value) => {
    if (value == "Yes") {
      const answer = {};
      answer[question.label.name] = value;
      question.questionType = QUESTION_TYPE.RADIO;
      setAnswer(question, answer, true);
    }
  };

  const handleSubmitClick = () => {
    if (question.id == CONSENT_QUESTION_IDS.CONSULTATION_FOR) {
      if (consultationFor != null) {
        handleForSubmitClick(consultationFor);
      }
    } else if (question.id == CONSENT_QUESTION_IDS.SPEAKING_TO) {
      if (speakingTo != null) {
        handleSpeakingToSubmitClick(speakingTo);
      }
    }
  };

  const submitButton = () => (
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
    </Grid>
  );

  if (question.id == CONSENT_QUESTION_IDS.CONSULTATION_FOR) {
    return (
      <Box>
        <CONSULTATION_FOR
          value={consultationFor}
          handleOnChange={handleForChange}
        />
        {submitButton()}
      </Box>
    );
  } else if (question.id == CONSENT_QUESTION_IDS.SPEAKING_TO) {
    return (
      <Box>
        <SPEAKING_TO
          value={speakingTo}
          handleOnChange={handleSpeakingToChange}
        />
        {submitButton()}
      </Box>
    );
  }
  return <></>;
}
