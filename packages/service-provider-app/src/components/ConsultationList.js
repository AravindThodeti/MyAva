import "date-fns";
import { format } from "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import DateFnsAdapter from "@date-io/date-fns";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { getConsultations } from "../utils/ApiUtils";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { URL_CONSULTATION_GET } from "../constants";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ConsultationList() {
  const classes = useStyles();
  const [showLoading, setShowLoading] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [consultations, setConsultations] = React.useState([]);
  const dateFns = new DateFnsAdapter();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      setShowLoading(true);
      getConsultations(startDate.toISOString(), endDate.toISOString()).then(
        (res) => {
          setConsultations(res.data);
        }
      ).finally(setShowLoading(false));
    }
  }, [selectedDate]);

  const getColor = (start, server) => {
    const startSlot = dateFns.date(start);
    const serverTime = dateFns.date(server);
    if (dateFns.isBefore(startSlot, serverTime)) {
      return "primary";
    }
    return "secondary";
  };

  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {showLoading && (
        <CenterCircularProgress />
      )}
      <Timeline align="alternate">
        {consultations.map((consultation, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography>
                {format(new Date(consultation.slot_start), "hh:mm b")}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={getColor(
                  consultation.slot_start,
                  consultation.server_time
                )}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Link to={URL_CONSULTATION_GET(consultation.id)}>
                  <Typography>Consultation #{consultation.id}</Typography>
                </Link>
                <Typography variant="h6" component="h2">
                  {consultation.customer.name}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {showLoading === false && consultations.length === 0 && (
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h5">
              No Consultations for {format(selectedDate, "dd, MMM yyyy")}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
