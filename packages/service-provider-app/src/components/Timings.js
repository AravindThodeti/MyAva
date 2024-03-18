import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import TimeRangeSelector from "./TimeRangeSelector";
import {getSchedule, saveSchedule} from "../store/actions/api.action";
import {Button, Container} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    alignContent: "flex-end",
  },
}));

export default function Timings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const defaultSchedule = [
    { weekday: "MONDAY", timings: [] },
    { weekday: "TUESDAY", timings: [] },
    { weekday: "WEDNESDAY", timings: [] },
    { weekday: "THURSDAY", timings: [] },
    { weekday: "FRIDAY", timings: [] },
    { weekday: "SATURDAY", timings: [] },
    { weekday: "SUNDAY", timings: [] },
  ];
  const [scheduleTimings, setScheduleTimings] = React.useState(defaultSchedule);
  const scheduleReducer = useSelector((state) => state.scheduleReducer);

  const handleChange = (weekday, timing) => {
    const currentTimings = [...scheduleTimings];
    const index = currentTimings.findIndex((item) => item.weekday === weekday);
    currentTimings[index].timings = timing;
    setScheduleTimings(currentTimings);
  };

  const fixDateChangeInSlots = scheduleData => {
    // deep clone the object
    let scheduledDataUpdated = JSON.parse(JSON.stringify(scheduleData));

    scheduledDataUpdated.days.map((day) => {
      const timingsUpdated = day.timings.map((slot) => {
        const {end_time, start_time} = slot;
        const endDate = slot.end_time.split("T")[0];
        const startWithUpdatedDate = slot.start_time.replace(/.*?T/gi, `${endDate}T`);
        let slotUpdated = {
          start_time: startWithUpdatedDate,
          end_time,
        };
        return slotUpdated;
      });
      const dayUpdated = day;
      dayUpdated.timings = timingsUpdated;
      return dayUpdated;
    });
    return scheduledDataUpdated
  };

  const handleSave = () => {

    let scheduleData = {days: scheduleTimings};
    const scheduledDataUpdated = fixDateChangeInSlots(scheduleData);

    dispatch(saveSchedule(scheduledDataUpdated));
  };

  React.useEffect(() => {
    if (scheduleReducer.schedule === undefined) {
      dispatch(getSchedule());
    } else if (scheduleReducer.schedule !== null) {
      setScheduleTimings(scheduleReducer.schedule.days);
    }
  }, [scheduleReducer.schedule]);

  if (scheduleReducer.fetchLoading) {
    return <CenterCircularProgress />;
  }

  return (
    <Container>
      <form className={classes.root} noValidate autoComplete="off">
        {scheduleTimings.map((timing, index) => (
          <TimeRangeSelector
            key={index}
            weekday={timing.weekday}
            timings={timing.timings}
            handleTimingChanged={handleChange}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          disabled={scheduleReducer.fetchLoading || scheduleReducer.saveLoading}
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}
