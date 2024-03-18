import "date-fns";
import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getSlots, initiateConsultation } from "../store/actions/api.action";
import * as initConsultationAction from "../store/actions/initConsultation.action";
import InputLabel from "@material-ui/core/InputLabel";
import Router from "next/router";
import * as constant from "../constants";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slotWrap: {
    borderRadius: 10,
    borderColor: "#D40A63",
    border: "2px solid",
  },
  submitButton: {
    width: "100%",
    margin: "15px 0px",
  },
  slotItems: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  slotItem: {
    marginRight: "12px",
    marginTop: theme.spacing(0.5),
  },
}));

export default function SlotSelector({ consultantId, userProgramId = null }) {
  const classes = useStyles();
  const dateFns = new DateFnsUtils();
  const dispatch = useDispatch();
  const [selectedDate, setDate] = React.useState("");
  const [selectedSlot, setSlot] = React.useState("");
  const slots = useSelector((state) => state.slotReducer.slots);
  const error = useSelector((state) => state.slotReducer.error);
  const scheduleError = useSelector(
    (state) => state.initConsultationReducer.error
  );
  const initConsultation = useSelector(
    (state) => state.initConsultationReducer.initConsultation
  );
  const scheduleLoading = useSelector(
    (state) => state.initConsultationReducer.loading
  );

  React.useEffect(() => {
    if (consultantId) {
      setDate("");
      setSlot("");
      dispatch(initConsultationAction.success(null));
      dispatch(getSlots(consultantId));
    }
  }, [consultantId]);

  React.useEffect(() => {
    if (slots && Object.keys(slots).length > 0) {
      setDate(Object.keys(slots)[0]);
    }
  }, [slots]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setSlot("");
  };
  const handleSlotChange = (value) => {
    setSlot(value);
  };

  const handleSchedule = () => {
    if (selectedDate !== "" && selectedSlot !== "") {
      const start = new Date(
        slots[selectedDate][selectedSlot].start_time
      ).toISOString();
      const end = new Date(
        slots[selectedDate][selectedSlot].end_time
      ).toISOString();
      dispatch(initiateConsultation(consultantId, start, end, userProgramId));
    }
  };

  if (slots) {
    const dateItems = Object.keys(slots).map((dateElement, index) => {
      return (
        <MenuItem key={index} value={dateElement}>
          {dateFns.format(dateFns.date(dateElement), "dd, MMM, yyyy")}
        </MenuItem>
      );
    });

    const dateItemsNew = Object.keys(slots).map((dateElement, index) => {
      const DAY_MAP = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
      };
      return (
        <div
          onClick={() => {
            setDate(dateElement);
          }}
          style={{
            display: "flex",
            margin: "15px 15px 15px 0px",
            border:
              selectedDate === dateElement
                ? "1px solid #dd66a6"
                : "1px solid #cdcdcd",
            justifyContent: "center",
            alignContent: "center",
            padding: "15px",
            flexDirection: "column",
          }}
          key={index}
        >
          {index === 0 ? (
            <div
              style={{
                color: selectedDate === dateElement ? "#dd66a6" : "#cecece",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Today
            </div>
          ) : (
            <div
              style={{
                color: selectedDate === dateElement ? "#dd66a6" : "#cecece",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {DAY_MAP[new Date(dateElement).getDay()]}
            </div>
          )}
          <div
            style={{
              color: selectedDate === dateElement ? "#dd66a6" : "#b8b8b8",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {new Date(dateElement).getDate()}
          </div>
        </div>
      );
    });
    let slotItems = <></>;
    if (selectedDate !== "") {
      if (!slots[selectedDate]) {
        return slotItems;
      }
      if (slots[selectedDate]?.length == 0) {
        slotItems = <Typography>No slots available !!</Typography>;
      } else {
        slotItems = slots[selectedDate].map((slot, index) => (
          <Chip
            className={classes.slotItem}
            key={index}
            color={index === selectedSlot ? "primary" : "default"}
            clickable
            onClick={() => handleSlotChange(index)}
            label={dateFns.format(dateFns.date(slot.start_time), "hh:mm a")}
            variant="outlined"
          />
        ));
      }
    }

    if (selectedDate !== "" && selectedSlot !== "" && initConsultation) {
      Router.push(
        constant.URL_CONSULTATION_PAYMENT_FORMAT,
        constant.URL_CONSULTATION_PAYMENT(initConsultation.id)
      );
      return <CenterCircularProgress />;
    }

    const form = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#443e41" }}>
          Select Date
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", overflow: "scroll" }}
        >
          {dateItemsNew}
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#443e41",
            margin: "15px 0px",
          }}
        >
          Select Time
        </div>
        {/* <div>
          <span>Morning</span>
          <span>AfterNoon</span>
          <span>Evening</span>
        </div> */}
        <div>{slotItems}</div>
        {/* <Box mt={2} className={classes.slotWrap}>
          <form noValidate autoComplete="off" className={classes.root}>
            <FormControl className={classes.formControl}>
              <Box className={classes.slotItems}>{slotItems}</Box>
            </FormControl>
            
          </form>
        </Box> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={handleSchedule}
          disabled={scheduleLoading}
        >
          Book Now
        </Button>
      </div>
    );
    if (selectedDate && selectedSlot && scheduleError) {
      return (
        <Container className={classes.root}>
          {form}
          <Typography variant="h6" component="h6">
            {scheduleError.message} !!
          </Typography>
        </Container>
      );
    }
    return <Container className={classes.root}>{form}</Container>;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" component="h4">
          {error.message} !!
        </Typography>
      </Container>
    );
  }

  return <CenterCircularProgress />;
}
