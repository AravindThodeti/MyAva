import * as React from "react";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { getUserPrograms } from "@/actions/api.action";
import * as constant from "@/constants/index";
import PendingTime from "./PendingTime";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { PROGRAM_STATUS, BASIC_QUESTIONS } from "@ava/common";
import PendingAssingment from "./PendingAssignment";
import QuestionAnswer from "@ava/common/lib/components/bot/QuestionAnswer";
import { saveUserProgramProfile } from "@/actions/api.action";
import Team from "./team/Team";
import Tracker from "./tracker/Tracker";
import Goals from "./goal/Goals";

export default function UserProgram() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const userPrograms = useSelector(
    (state) => state.userProgramReducer.programs
  );
  const [currentId, setCurrentId] = React.useState(null);
  React.useEffect(() => {
    if (userPrograms === undefined) {
      dispatch(getUserPrograms());
    } else if (userPrograms && userPrograms.length > 0) {
      setCurrentId(userPrograms[0].id);
    }
  }, [userPrograms]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProgramChange = (id) => {
    setCurrentId(id);
  };

  const pushAnswers = (questions) => {
    const basicProfile = { questions: [] };
    questions.forEach((question) => {
      basicProfile.questions.push({
        id: question.id,
        answer: question.answer,
        question: question.question,
      });
    });
    if (currentId !== null) {
      dispatch(saveUserProgramProfile(currentId, basicProfile));
    }
  };

  if (userPrograms && userPrograms.length === 0) {
    Router.replace(constant.URL_PROGRAMS);
  }

  const getConsultationTabData = (userProgram) => {
    if (userProgram.status == PROGRAM_STATUS.PENDING) {
      return (
        <QuestionAnswer
          initialQuestions={BASIC_QUESTIONS}
          sendAnswers={pushAnswers}
        />
      );
    } else if (userProgram.status == PROGRAM_STATUS.PROFILE_COMPLETED) {
      return <PendingAssingment />;
    } else {
      return (
        <Team
          userProgramId={userProgram.id}
          members={userProgram.service_providers}
        />
      );
    }
  };

  if (userPrograms && currentId) {
    const index = userPrograms.findIndex((program) => program.id == currentId);
    if (index < 0) {
      Router.replace(constant.URL_MY_PROGRAMS);
    } else {
      const userProgram = userPrograms[index];
      return (
        <>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="my-program"
          >
            <Tab label="Consultation" />
            <Tab
              label="Tracker"
              disabled={
                userProgram.status == PROGRAM_STATUS.PENDING ||
                userProgram.status == PROGRAM_STATUS.PROFILE_COMPLETED
              }
            />
            <Tab
              label="Goals"
              disabled={
                userProgram.status == PROGRAM_STATUS.PENDING ||
                userProgram.status == PROGRAM_STATUS.PROFILE_COMPLETED
              }
            />
          </Tabs>
          <PendingTime
            programs={userPrograms}
            currentProgram={userProgram}
            handleProgramChange={handleProgramChange}
          />
          {value == 0 && getConsultationTabData(userProgram)}
          {value == 1 && (
            <Tracker userProgram={userProgram} userProgramId={userProgram.id} />
          )}
          {value == 2 && (
            <Goals userProgram={userProgram} userProgramId={userProgram.id} />
          )}
        </>
      );
    }
  }
  return <CenterCircularProgress />;
}
