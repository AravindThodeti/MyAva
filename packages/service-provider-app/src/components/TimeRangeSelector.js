import "date-fns";
import { parse } from "date-fns";
import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { Box, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

export default function TimeRangeSelector(props) {
  const day = props.weekday;
  const [selectedTimings, setSelectedTimings] = React.useState([]);

  React.useEffect(() => {
    if (props.timings !== undefined) {
      setSelectedTimings(props.timings);
    }
  }, [props.timings]);

  const handleRemove = (index) => {
    const currentTimings = [...selectedTimings];
    currentTimings.splice(index, 1);
    setSelectedTimings(currentTimings);
    props.handleTimingChanged(day, currentTimings);
  };

  const handleAdd = () => {
    const currentTimings = [...selectedTimings];
    if (currentTimings.length > 0) {
      currentTimings.push({
        start_time: currentTimings[currentTimings.length - 1]["end_time"],
        end_time: parse("18:00:00", "HH:mm:ss", new Date()),
      });
    } else {
      currentTimings.push({
        start_time: parse("09:00:00", "HH:mm:ss", new Date()),
        end_time: parse("18:00:00", "HH:mm:ss", new Date()),
      });
    }
    setSelectedTimings(currentTimings);
    props.handleTimingChanged(day, currentTimings);
  };

  const handleStartChange = (index, date) => {
    const currentTimings = [...selectedTimings];
    date.setSeconds(0);
    currentTimings[index].start_time = date;
    setSelectedTimings(currentTimings);
    props.handleTimingChanged(day, currentTimings);
  };

  const handleEndChange = (index, date) => {
    const currentTimings = [...selectedTimings];
    date.setSeconds(0);
    currentTimings[index].end_time = date;
    setSelectedTimings(currentTimings);
    props.handleTimingChanged(day, currentTimings);
  };

  const addButton = (
    <IconButton
      aria-label="add"
      color="primary"
      onClick={() => {
        handleAdd();
      }}
    >
      <AddIcon />
    </IconButton>
  );

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{day}</Typography>
        {addButton}
      </Box>
      {selectedTimings.map((timing, index) => (
        <Box
          key={index}
          style={{ display: "flex", justifyContent: "space-around", borderBottom: "2px solid black", padding: "10px 0px" }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-evenly">
              <KeyboardTimePicker
                label="Start Time"
                placeholder="09:00 AM"
                mask="__:__ _M"
                value={timing.start_time}
                minutesStep={5}
                onChange={(date) => handleStartChange(index, date)}
              />
              <KeyboardTimePicker
                label="End Time"
                placeholder="05:00 PM"
                mask="__:__ _M"
                value={timing.end_time}
                minutesStep={5}
                onChange={(date) => handleEndChange(index, date)}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleRemove(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
