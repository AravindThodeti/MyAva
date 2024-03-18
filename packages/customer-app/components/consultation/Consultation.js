import * as React from "react";
import {
  getConsultationDetail,
  saveConsultationProfile,
  updateConsultationDepartmentQuestionnaire,
  updateConsultationConsent,
} from "@/utils/ApiUtils";
import {
  CONSULTATION_STATUS,
  BASIC_QUESTIONS,
  DIET_QUESTIONS,
  GYNAECOLOGY_QUESTIONS,
  SKIN_QUESTIONS,
  QUESTION_TYPE,
  DEPARTMENTS,
} from "@ava/common";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import QuestionAnswer from "@ava/common/lib/components/bot/QuestionAnswer";
import { useSelector } from "react-redux";
import ChatPrescriptionTab from "./ChatPrescriptionTab";
import Chat from "@ava/common/lib/components/Chat";
import { number } from "prop-types";

const propTypes = {
  id: number,
};

const Consultation = ({ id }) => {
  const profile = useSelector((state) => state.profileReducer.profile);
  const [consultation, setConsultation] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (consultation == null && id) {
      getConsultationDetail(id).then((res) => {
        setConsultation(res);
      });
    }
  }, [consultation, id]);

  const getQuestionnaire = (department_id) => {
    if (department_id == DEPARTMENTS.GYNAECOLOGIST) {
      return GYNAECOLOGY_QUESTIONS;
    } else if (department_id == DEPARTMENTS.DERMATOLOGIST) {
      return SKIN_QUESTIONS;
    } else if (department_id == DEPARTMENTS.NUTRITIONIST) {
      return DIET_QUESTIONS;
    }
    return null;
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
    if (id) {
      setLoading(true);
      saveConsultationProfile(id, basicProfile)
        .then((res) => {
          setConsultation(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const pushDepartmentAnswers = (questions) => {
    const departmentProfiling = { questions: [] };
    questions.forEach((question) => {
      departmentProfiling.questions.push({
        id: question.id,
        answer: question.answer,
        question: question.question,
      });
    });
    if (id) {
      setLoading(true);
      updateConsultationDepartmentQuestionnaire(id, departmentProfiling)
        .then((res) => {
          setConsultation(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const pushConsent = (questions) => {
    const consent = { questions: [] };
    questions.forEach((question) => {
      consent.questions.push({
        id: question.id,
        answer: question.answer,
        question: question.question,
      });
    });
    if (id) {
      setLoading(true);
      updateConsultationConsent(id, consent)
        .then((res) => {
          setConsultation(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <CenterCircularProgress />;
  }

  if (consultation) {
    if (consultation.consultation_status == CONSULTATION_STATUS.INITIALIZED) {
      return (
        <QuestionAnswer
          initialQuestions={BASIC_QUESTIONS}
          sendAnswers={pushAnswers}
          height="85vh"
        />
      );
    }
    if (
      !consultation.department_questionnaire &&
      getQuestionnaire(consultation.department_id)
    ) {
      return (
        <QuestionAnswer
          initialQuestions={getQuestionnaire(consultation.department_id)}
          sendAnswers={pushDepartmentAnswers}
          height="85vh"
        />
      );
    }
    if (!consultation.consent && profile) {
      const initalQuestion = [
        {
          questionType: QUESTION_TYPE.CONSENT,
          question: `Is this consultation for ${profile?.name}?`,
          label: { label: "Consultation for", name: "consultation_for" },
        },
      ];
      return (
        <QuestionAnswer
          initialQuestions={initalQuestion}
          sendAnswers={pushConsent}
          height="85vh"
          hasPreText={false}
          profile={profile}
        />
      );
    }
    if (consultation.department_id === DEPARTMENTS.GYNAECOLOGIST) {
      return <ChatPrescriptionTab consultationId={id} />;
    }
    return <Chat consultationId={id} />;
  }
  return <CenterCircularProgress />;
};
Consultation.propTypes = propTypes;
export default Consultation;
