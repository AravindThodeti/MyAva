import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import * as constant from "@/constants/index";
import { isFuture, isPast, format } from "date-fns";
import { object, array, number } from "prop-types";

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  consultantDetail: {
    marginBottom: theme.spacing(2),
  },
  name: {
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  department: {
    fontSize: "0.8rem",
    fontWeight: 400,
  },
  button: {
    fontSize: "0.9rem",
    textTransform: "capitalize",
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    background: "linear-gradient(180deg, #EC179C 0%, #D40A63 100%)",
  },
  schedule: {
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  status: {
    fontWeight: 600,
  },
  statusColor: {
    color: "#3ACC6C",
  },
}));
const propTypes = {
  consultants: array,
  id: number,
};
const TeamList = (props) => {
  const ConsultationStatus = ({ consultant }) => {
    const classes = useStyles();
    const consultations = consultant.consultations;
    if (consultations && consultations.length > 0) {
      const lastConsultation = consultations[0];
      const slotStart = new Date(lastConsultation.slot_start);
      const slotEnd = new Date(lastConsultation.slot_end);
      let children;
      if (isFuture(slotStart)) {
        children = (
          <Typography className={clsx(classes.status, classes.statusColor)}>
            Scheduled
          </Typography>
        );
      } else if (isPast(slotStart) && isFuture(slotEnd)) {
        children = (
          <Typography className={clsx(classes.status, classes.statusColor)}>
            Active
          </Typography>
        );
      } else {
        children = <Typography className={classes.status}>Complete</Typography>;
      }
      return (
        <Link
          href={constant.URL_CONSULTATION_CHAT_FORMAT}
          as={constant.URL_CONSULTATION_CHAT(lastConsultation.id)}
          passHref={true}
        >
          {children}
        </Link>
      );
    }
    return (
      <Link
        href={constant.URL_USER_PROGRAM_SLOT_SELECTION_FORMAT}
        as={constant.URL_USER_PROGRAM_SLOT_SELECTION(props.id, consultant.id)}
        passHref={true}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="small"
        >
          Schedule Now
        </Button>
      </Link>
    );
  };
  ConsultationStatus.propTypes = {
    consultant: object,
  };

  const ConsultationTime = ({ consultant }) => {
    const classes = useStyles();
    const consultations = consultant.consultations;
    if (consultations && consultations.length > 0) {
      const lastConsultation = consultations[0];
      const slotStart = new Date(lastConsultation.slot_start);
      const slotEnd = new Date(lastConsultation.slot_end);
      if (isFuture(slotStart)) {
        return (
          <Link
            href={constant.URL_CONSULTATION_CHAT_FORMAT}
            as={constant.URL_CONSULTATION_CHAT(lastConsultation.id)}
            passHref={true}
          >
            <Typography className={classes.schedule}>
              {format(slotStart, "do MMM, EEE, hh:mm a")}
            </Typography>
          </Link>
        );
      } else if (isPast(slotStart) && isFuture(slotEnd)) {
        return <></>;
      } else {
        return (
          <Link
            href={constant.URL_USER_PROGRAM_SLOT_SELECTION_FORMAT}
            as={constant.URL_USER_PROGRAM_SLOT_SELECTION(
              props.id,
              consultant.id
            )}
            passHref={true}
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="small"
            >
              Consult Now
            </Button>
          </Link>
        );
      }
    }
    return <></>;
  };
  ConsultationTime.propTypes = {
    consultant: object,
  };

  const TeamItem = ({ consultant }) => {
    const classes = useStyles();
    return (
      <Box
        p={1}
        boxShadow={3}
        mt={1}
        bgcolor="background.paper"
        className={classes.item}
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Avatar
              src={consultant.user.image_url}
              className={classes.avatar}
              alt={consultant.name}
            />
          </Grid>
          <Grid container item xs={9} className={classes.consultantDetail}>
            <Grid container justify="space-between" item>
              <Grid item>
                <Typography className={classes.name}>
                  {consultant.title} {consultant.name}
                </Typography>
              </Grid>
              <Grid item>
                <ConsultationStatus consultant={consultant} />
              </Grid>
            </Grid>
            <Grid container item justify="space-between">
              <Grid item>
                <Typography className={classes.department}>
                  {consultant.department.name}
                </Typography>
              </Grid>
              <Grid item>
                <ConsultationTime consultant={consultant} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  TeamItem.propTypes = {
    consultant: object,
  };
  return (
    <Box m={0.5} p={0.5}>
      {props.consultants.map((c) => (
        <TeamItem key={c.id} consultant={c} />
      ))}
    </Box>
  );
};
TeamList.propTypes = propTypes;
export default TeamList;
