import * as React from "react";
import { Waypoint } from "react-waypoint";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { getConsultationList } from "@/actions/api.action";
import CentreCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Link from "next/link";
import {
  URL_CONSULTATION_CHAT,
  URL_CONSULTATION_CHAT_FORMAT,
} from "@/constants/index";
import { Avatar, Typography, Box } from "@material-ui/core";
import { bool } from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  specializations: {
    textTransform: "capitalize",
  },
}));
const propTypes = {
  active: bool,
};

const ConsultationList = ({ active = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activePaginationMeta = useSelector(
    (store) => store.consultationReducer.activePaginationMeta
  );
  const activeConsultations = useSelector(
    (store) => store.consultationReducer.activeConsultations
  );
  const inactivePaginationMeta = useSelector(
    (store) => store.consultationReducer.inactivePaginationMeta
  );
  const inactiveConsultations = useSelector(
    (store) => store.consultationReducer.inactiveConsultations
  );

  React.useEffect(() => {
    if (active) {
      if (activeConsultations === undefined) {
        dispatch(getConsultationList(undefined, active));
      }
    } else {
      if (inactiveConsultations === undefined) {
        dispatch(getConsultationList(undefined, active));
      }
    }
  }, [active]);

  const consultationList = (classes, consultations, paginationMeta, active) => (
    <div className={classes.root}>
      <List>
        {consultations.map((consultation, index) => (
          <ListItem key={consultation.id}>
            <React.Fragment key={consultation.id}>
              <Link
                href={URL_CONSULTATION_CHAT_FORMAT}
                as={URL_CONSULTATION_CHAT(consultation.id)}
                passHref={true}
              >
                <Box display="flex" width="100%">
                  <Box style={{ flexGrow: "1" }}>
                    <Avatar
                      alt={consultation.service_provider.name}
                      src={consultation.service_provider.user.image_url}
                    />
                  </Box>
                  <Box style={{ display: "block", float: "right" }}>
                    <Typography style={{ float: "right" }}>
                      {consultation.service_provider.name}
                    </Typography>
                    {consultation.service_provider.specializations && (
                      <Typography className={classes.specializations}>
                        Consulting for:
                        {consultation.service_provider.specializations
                          .join(", ")
                          .toLowerCase()}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Link>
              {paginationMeta.has_next &&
                index === consultations.length - paginationMeta.page_size && (
                  <Waypoint
                    onEnter={() =>
                      dispatch(
                        getConsultationList(
                          paginationMeta.page_number + 1,
                          active
                        )
                      )
                    }
                  ></Waypoint>
                )}
            </React.Fragment>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (active) {
    if (activeConsultations !== undefined && activeConsultations !== null) {
      return consultationList(
        classes,
        activeConsultations,
        activePaginationMeta,
        active
      );
    }
  } else {
    if (inactiveConsultations !== undefined && inactiveConsultations !== null) {
      return consultationList(
        classes,
        inactiveConsultations,
        inactivePaginationMeta,
        active
      );
    }
  }

  return <CentreCircularProgress />;
};
ConsultationList.propTypes = propTypes;
export default ConsultationList;
