import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { animateScroll } from "react-scroll";
import Box from "@material-ui/core/Box";
import CenterCircularProgress from "../CenterCircularProgress";
import MultipleTextInput from "./inputs/MultipleTextInput";
import DateSelect from "./inputs/DateSelect";
import MultipleNumberSelect from "./inputs/MultipleNumberSelect";
import NumberInput from "./inputs/NumberInput";
import TextInput from "./inputs/TextInput";
import Select from "./inputs/Select";
import SelectWithOther from "./inputs/SelectWithOther";
import { QUESTION_TYPE } from "../../constants";
import RadioWithOther from "./inputs/RadioWithOther";
import Radio from "./inputs/Radio";
import TimeRange from "./inputs/TimeRange";
import Consent from "./inputs/Consent";
import QuestionAnswerList from "./QuestionAnswerList";

const useStyles = makeStyles((theme) => ({
  answerInput: {
    border: "solid 1px",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
  question: {
    float: "left",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
  hint: {
    float: "left",
    paddingBottom: theme.spacing(1),
    width: "100%",
    fontStyle: "italic",
  },
  answer: {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
}));

const getAnswerConfig = (
  question,
  setAnswer,
  questions,
  setQuestions,
  profile
) => {
  switch (question.questionType) {
    case QUESTION_TYPE.MULTIPLE_TEXT_INPUT:
      return <MultipleTextInput question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.DATE_SELECT:
    case QUESTION_TYPE.YEAR_SELECT:
      return <DateSelect question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.MULTIPLE_NUMBER_SELECT:
      return <MultipleNumberSelect question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.NUMBER_INPUT:
      return <NumberInput question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.SELECT:
      return <Select question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.SELECT_WITH_OTHER:
      return <SelectWithOther question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.TEXT_INPUT:
      return <TextInput question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.RADIO_WITH_OTHER:
      return <RadioWithOther question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.RADIO:
      return <Radio question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.TIME_RANGE:
      return <TimeRange question={question} setAnswer={setAnswer} />;
    case QUESTION_TYPE.CONSENT:
      return (
        <Consent
          question={question}
          setAnswer={setAnswer}
          questions={questions}
          setQuestions={setQuestions}
          profile={profile}
        />
      );
    default:
      return <CenterCircularProgress />;
  }
};

export default function QuestionAnswer({
  initialQuestions,
  sendAnswers,
  height = "75vh",
  hasPreText = true,
  profile,
}) {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState(initialQuestions);

  const setAnswer = (question, answer, updateQuestion = false) => {
    const questionIndex = questions.findIndex((q) => q.id === question.id);
    const currentQuestions = [...questions];
    currentQuestions[questionIndex]["answer"] = answer;
    if (updateQuestion) {
      currentQuestions[questionIndex] = {
        ...currentQuestions[questionIndex],
        ...question,
      };
    }
    setQuestions(currentQuestions);
    if (questionIndex == questions.length - 1) {
      sendAnswers(questions);
    }
  };

  const AnswerInput = () => {
    let index;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].answer) {
        index = i;
        break;
      }
    }
    if (index !== undefined) {
      return getAnswerConfig(
        questions[index],
        setAnswer,
        questions,
        setQuestions,
        profile
      );
    }
    return <CenterCircularProgress />;
  };

  const PreText = () => {
    return (
      <>
        <Typography>
          Hi there, Welcome to Ava! I am your buddy and I will help you get
          started.
        </Typography>
        <Typography>
          Please answer these questions to let me know you better.
        </Typography>
      </>
    );
  };

  React.useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "qa-list",
    });
  }, [questions]);

  return (
    <Box
      padding={2}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `${height}`,
        backgroundColor: "transparent",
      }}
    >
      <Box style={{ overflow: "scroll" }} id="qa-list">

        {hasPreText && <PreText />}
        <Box>
          <QuestionAnswerList questions={questions} />
        </Box>
      </Box>
      <Box
        className={classes.answerInput}
        style={{ justifyContent: "flex-end" }}
        marginTop={4}
      >
        <AnswerInput />
      </Box>
    </Box>
  );
}
