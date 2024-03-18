import * as React from "react";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TeamList from "./TeamList";
import { getConsultants, getConsultationsList } from "@/utils/ApiUtils";
import { array, number } from "prop-types";

const propTypes = {
  userProgramId: number,
  members: array,
};
const useStyles = makeStyles(() => ({
  heading: { color: "#89043F" },
}));

const Team = ({ userProgramId, members }) => {
  const classes = useStyles();
  const [consultants, setConsultants] = React.useState(null);
  const fetchData = async () => {
    const ids = [];
    members.forEach((m) => ids.push(m.service_provider_id));
    const memberConsultants = await getConsultants(null, ids);
    const consultationResponse = await getConsultationsList(
      0,
      null,
      userProgramId
    );
    const consultations = consultationResponse.data;
    memberConsultants.forEach((member) => {
      member.consultations = consultations.filter(
        (consultation) => consultation.service_provider.id == member.id
      );
    });
    setConsultants(memberConsultants);
  };
  React.useEffect(() => {
    if (members && members.length > 0) {
      fetchData();
    }
  }, [members]);

  if (consultants) {
    return (
      <Box mt={2} p={1}>
        <Typography variant="h6" className={classes.heading}>
          Your Team
        </Typography>
        <TeamList id={userProgramId} consultants={consultants} />
      </Box>
    );
  }
  return <div></div>;
};

Team.propTypes = propTypes;
export default Team;
