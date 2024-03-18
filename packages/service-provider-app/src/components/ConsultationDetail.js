import * as React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { BASIC_QUESTIONS } from "@ava/common";
import FilteredQuestionAnswerList from "@ava/common/lib/components/bot/FilteredQuestionAnswerList";
import Chat from "@ava/common/lib/components/Chat";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { getConsultationDetail } from "utils/ApiUtils";
import { getQuestionnaire } from "@ava/common/lib/utils/index";
import { DEPARTMENTS } from "@ava/common";
import DietPlan from "./consultation/DietPlan";
// import DietPlanV2 from "./consultation/DietPlanV2";
import DietPlanParent from "./consultation/DietPlanParent";
import WorkoutPlan from "./consultation/WorkoutPlan";
import Prescription from "./consultation/Prescription";
import Goal from "./consultation/Goal";
import ConsumedDietPlan from "./consultation/consumedDietPlan/ConsumedDietPlan";
import { CONSENT_NO_QUESTIONS, CONSENT_INITIAL_QUESTIONS } from "@ava/common";
// import DietPlanParent from "./consultation/DietPlanParent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

export default function ConsultationDetail() {
  let { id } = useParams();
  const consultationId = id;
  const [value, setValue] = React.useState(0);
  const [consultation, setConsultation] = React.useState(null);

  React.useEffect(() => {
    getConsultationDetail(consultationId).then((res) => setConsultation(res));
  }, [consultationId]);

  React.useEffect(() => {}, [consultation]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const departmentTabLabel = (consultation) => {
    if (consultation) {
      if (consultation.department_id === DEPARTMENTS.NUTRITIONIST) {
        return { label: "Diet Plan" };
      } else if (consultation.department_id === DEPARTMENTS["FITNESS EXPERT"]) {
        return { label: "Workout Plan" };
      } else {
        return { label: "Prescription" };
      }
    }
    return { label: "" };
  };

  const DepartmentTab = ({ consultation }) => {
    if (consultation) {
      if (consultation.department_id === DEPARTMENTS.NUTRITIONIST) {
        return <DietPlanParent  consultationId={consultationId}/>;
        //return <DietPlan consultationId={consultation.id} />;
      } else if (consultation.department_id === DEPARTMENTS["FITNESS EXPERT"]) {
        return <WorkoutPlan consultationId={consultationId} />;
      }
      return <Prescription consultationId={consultation.id} />;
    }
    return <></>;
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Chat" {...a11yProps(0)} />
        <Tab label="Profile" {...a11yProps(1)} />
        <Tab label={departmentTabLabel(consultation).label} {...a11yProps(2)} />
        {consultation &&
          consultation.user_program_id &&
          (consultation.department_id === DEPARTMENTS.NUTRITIONIST ||
            consultation.department_id === DEPARTMENTS["FITNESS EXPERT"]) && (
            <Tab label="Goal" {...a11yProps(3)} />
          )}
        <Tab label="Consumed Diet plan" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <div>
          {consultation && (
            <FilteredQuestionAnswerList
              userQuestions={consultation.profile}
              questionList={BASIC_QUESTIONS}
              readOnly={true}
            />
          )}
          {consultation && consultation.department_questionnaire && (
            <FilteredQuestionAnswerList
              userQuestions={consultation.department_questionnaire}
              questionList={getQuestionnaire(consultation.department_id)}
              readOnly={true}
            />
          )}
          {consultation && consultation.consent && (
            <FilteredQuestionAnswerList
              userQuestions={consultation.consent}
              questionList={[
                ...CONSENT_INITIAL_QUESTIONS,
                ...CONSENT_NO_QUESTIONS,
              ]}
              readOnly={true}
              overrideQuestion={true}
            />
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Chat consultationId={consultationId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DepartmentTab consultation={consultation} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {consultation && (
          <Goal
            userProgramId={consultation.user_program_id}
            consultationId={consultationId}
            departmentId={consultation.department_id}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ConsumedDietPlan />
      </TabPanel>
    </div>
  );
}
