import React from "react";
import styles from "./periodTrackerResult.module.scss";
import { SquareDateItemWithDay } from "@/components/dateList";
import { useState, useEffect } from "react";
import { generateArrayOfRelativeDates } from "@/utils/Utility";
import CircularProgressBar from "@/components/circularProgress";
import { periodTrackerResultAPI } from "@/utils/ApiUtils";
import Notes from "@/components/notes";
import * as constant from "@/constants/index";
import RotatingCircle from "pages/user/rotating-circle";
import PeriodTracker from "../period-tracker";
import router from "next/router";
import { render } from "@testing-library/react";
import UserProgram from "@/components/programs/UserProgram";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: "6px 12px"
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    whiteSpace: "nowrap",
    fontSize: "13px",
    fontWeight: "bold"
  },
  secondaryHeading: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    paddingLeft: "35px",
    position:"absolute",
    right:"50px"
  },
}));
function PeriodTrackerResult() {
  const innerTextFontSize = "35px";
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dateData, setDateData] = useState("");
  const [dateScroll, setDateScroll] = useState(false);
  const [periodTrackedResultFromAPI, setPeriodTrackedResultFromAPI] = useState(
    {}
  );
  const [currentDayDetails, setCurrentDayDetails] = useState([]);
  const [lastPeriodDetails, setLastPeriodDetails] = useState([]);
  const [fertileDetails, setFertileDetails] = useState([]);
  const [ovulationFirstDayDetails, setOvulationStartDayDetails] = useState([]);
  const [ovulationLastDayDetails, setOvulationLastDayDetails] = useState([]);
  const [nextPeriodDetails, setNextPeriodDetails] = useState([]);


  const [periodPhaseDates, setPeriodPhaseDates] = useState([]);
  const [currentDayCount, setDayCount] = useState(24);
  const [dayNumType, setDayNumType] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [percentage,setPercentage] = useState(0)
  const [phaseName, setPhaseName] = useState("");
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const getPeriodTrackerResults = async () => {
    const result = await periodTrackerResultAPI();
    setPeriodTrackedResultFromAPI(result);
  };
  const handleButton =() =>{
console.log("hi")   
    router.push(constant.URL_MY_PERIODTRACKER_EDIT)
  }
  const getDateAndMonth = (date) => {
    console.log(date);
    date = new Date(date);
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    console.log("nextDate", nextDay);
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    let dateDetails = date.toString().split(" ", 3);
    let nextDateDetails = nextDay.toString().split(" ", 3);
    dateDetails.push(nextDateDetails[2]);
    return dateDetails;
  };
  const getPeriodPhaseDates = (periodDate, length) => {
    console.log("periodssss", periodDate, length);
    let dates = [];
    for (let i = 0; i <= length; i++) {
      var date = new Date(periodDate);
      date.setDate(date.getDate() + i);
      date = new Date(date.getTime());
      date = date.toISOString().split("T")[0];
      console.log(i, date);
      dates.push(date);
    }
    setPeriodPhaseDates(dates);
  };

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    getPeriodTrackerResults();
    if (
      periodTrackedResultFromAPI &&
      Object.keys(periodTrackedResultFromAPI).length > 0
    ) {
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log("date", new Date());
    setCycleLength(periodTrackedResultFromAPI.cycle_length);
    setCurrentDayDetails(getDateAndMonth(new Date()));
    setLastPeriodDetails(
      getDateAndMonth(periodTrackedResultFromAPI.last_period_date)
    );
    setNextPeriodDetails(
      getDateAndMonth(periodTrackedResultFromAPI.next_period_date)
    );
    setFertileDetails(
      getDateAndMonth(periodTrackedResultFromAPI.ovulation_day)
    );
    setOvulationStartDayDetails(
      getDateAndMonth(
        periodTrackedResultFromAPI.period_tracker_phase_details
          ?.ovulation_phase_start_date
      )
    );
    setOvulationLastDayDetails(
      getDateAndMonth(
        periodTrackedResultFromAPI.period_tracker_phase_details
          ?.ovulation_phase_end_date
      )
    );
    setDayCount(periodTrackedResultFromAPI.day_count);
    setPhaseName(periodTrackedResultFromAPI.phase_name);
    getPeriodPhaseDates(
      periodTrackedResultFromAPI.last_period_date,
      periodTrackedResultFromAPI.period_phase_length
    );
    if (phaseName) {
      setPhaseName(periodTrackedResultFromAPI.phase_name.replaceAll("_", " "));
      setPercentage(currentDayCount/cycleLength)
    }
  }, [periodTrackedResultFromAPI, phaseName]);

  useEffect(() => {
    let checkLastDigit = currentDayCount % 10;
    let checkPreFix = currentDayCount % 100;
    if (checkLastDigit == 1 && checkPreFix != 11) {
      setDayNumType("st");
    } else if (checkLastDigit == 2 && checkPreFix != 12) {
      setDayNumType("nd");
    } else if (checkLastDigit == 3 && checkPreFix != 13) {
      setDayNumType("rd");
    } else {
      setDayNumType("th");
    }
  }, [currentDayCount]);

  useEffect(() => {
    var dates = generateArrayOfRelativeDates(selectedDate, 4);
    // dates = dates.filter((d) => {
    //   console.log("datesss",d.fullDate , periodPhaseDates[0])
    //   return new Date(d.fullDate)>=new Date()
    // } )
    setDateData(dates);
  }, [periodTrackedResultFromAPI, selectedDate]);

  useEffect(() => {
    setDateScroll(true);
  }, [selectedDate]);
  const getColorCode = (currentDayCount) => {
    return currentDayCount > 0 ? ["#F22C1F", "#48C07F"] : "#48C07F";
  };
  return (
    <div className={styles.body}>
      <div className={styles.pinkBackGround}>
        <div className={styles.profile}>
          <img src="/assets/images/defaultAvatar.svg" alt="user" />
          <h3>Today, {currentDayDetails[1] + " " + currentDayDetails[2]}</h3>
        </div>
        <div className={styles.dateSection}>
          {dateData &&
            dateData.map((dateElement, i) => (
              <SquareDateItemWithDay
                myClass={
                  periodPhaseDates.includes(dateElement.fullDate)
                    ? "periodTrackerPink"
                    : dateElement.fullDate < periodPhaseDates[0]
                    ? "periodTrackerDisable"
                    : "periodTrackerBlack"
                }
                key={i}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                date={dateElement.date}
                day={dateElement.day}
                fullDate={dateElement.fullDate}
                dateScroll={true}
                disable={true}
              />
            ))}
        </div>
      </div>
      <div className={styles.periodCircle}> 
      <div className={styles.progressbarBackground}> 
      <RotatingCircle imageUrl="/assets/images/periodTracker/periodCycle.png" percentageValue={percentage} dayCount={currentDayCount} cycleLength={cycleLength}></RotatingCircle>     
      </div>
        <div className={styles.healthScore}>
          <span
            className={styles.scoreValue}
          >
            <label>{phaseName}</label>
            <span className={styles.dayCount}>
              {currentDayCount}{" "}
              <span className={styles.dayType}>{dayNumType}</span>
            </span>
            <span className={styles.day}>day of cycle</span>
          </span>
        </div>
        </div>
       
        <div className={styles.edit}><button onClick={handleButton} >
              Edit Tracker
            </button></div>

      <div className={` ${styles.dFlex} ${styles.justifyContentSpaceAround}`}>
        <div className={styles.periodPhase}>
          <img
            src="/assets/images/periodTracker/Menstrual cup.svg"
            alt="menstrual cup"
          ></img>
          <p className={styles.fsSmall}>
            <span>Last Period</span> <br />{" "}
            <span className={styles.fsExtraSmall}>
              {lastPeriodDetails[0]}{" "}
              <span className={styles.textRed}>{lastPeriodDetails[1]}</span>{" "}
              {lastPeriodDetails[2]}
            </span>
          </p>
        </div>
        
        <div className={styles.periodPhase}>
          <img
            src="/assets/images/periodTracker/Menstrual cup.svg"
            alt="menstrual cup"
          ></img>
          <p className={styles.fsSmall}>
            <span>Next Period</span> <br />{" "}
            <span className={styles.fsExtraSmall}>
              {nextPeriodDetails[0]}{" "}
              <span className={styles.textRed}>{nextPeriodDetails[1]} </span>
              {nextPeriodDetails[2]}
            </span>
          </p>
        </div>
      </div>
      <div className={` ${styles.dFlex} ${styles.justifyContentSpaceAround}`}>
        <div className={styles.periodPhase}>
          <img
            src="/assets/images/periodTracker/Ovulation.svg"
            alt="menstrual cup"
          ></img>
          <p className={styles.fsSmall}>
            <span className={styles.textPurple}>Ovulation</span> <br />{" "}
            <span className={styles.fsExtraSmall}>
              <span className={styles.textPurple}>
                {ovulationFirstDayDetails[1]}
              </span>{" "}
              {ovulationFirstDayDetails[2]} -{" "}
              <span className={styles.textPurple}>
                {ovulationLastDayDetails[1]}
              </span>{" "}
              {ovulationLastDayDetails[2]}
            </span>
          </p>
        </div>
        <div className={styles.periodPhase}>
          <img
            src="/assets/images/periodTracker/Ovulation.svg"
            alt="ovulation"
          ></img>
          <p className={styles.fsSmall}>
            <span className={styles.textPurple}>Fertile day</span> <br />{" "}
            <span className={styles.fsExtraSmall}>
              <span className={styles.textPurple}>{fertileDetails[1]}</span>{" "}
              {fertileDetails[2]} -{" "}
              <span className={styles.textPurple}>{fertileDetails[1]}</span>{" "}
              {fertileDetails[3]}
            </span>
          </p>
        </div>
      </div>
      <div>

      <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>PUMPKIN & FLAX SEEDS</Typography>
          <Typography className={classes.secondaryHeading}> <strong>
              {" "}
              DAY- 1 TO{" "}
              {Math.floor(periodTrackedResultFromAPI.cycle_length / 2)}{" "}
            </strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className={styles.noteStyle}>
              <span> <b>Pumpkin seeds </b></span>
              <span >are rich in magnesium and calcium,therefore plays a major role in improving bone density especially during the menopause stage. These high fibre seeds also helps in overall weight management.</span>
            </div>
            <div className={styles.noteStyle}>
              <span> <b>Flax seeds </b></span>
              <span >are known to boost women’s fertility by restoring hormone health and supporting ovulation. These seeds are often suggested to relieve constipation or bloating caused during periods. </span>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
      <div className={classes.root}>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>SESAME & SUNFLOWER SEEDS</Typography>
          <Typography className={classes.secondaryHeading}><strong>
              {" "}
              DAY- {Math.floor(periodTrackedResultFromAPI.cycle_length / 2) +
                1}{" "}
              TO {periodTrackedResultFromAPI.cycle_length}{" "}
            </strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className={styles.noteStyle}>
              <span> <b>Sesame seeds </b></span>
              are a high source of protein and iron which helps in improving the blood production. Minerals like magnesium and calcium in these seeds act as an antispasmodic properties. Helps in muscle relaxation and thus very beneficial during Menstrual cramps.
            </div>
            <div className={styles.noteStyle}>
              <span> <b>Sunflower seeds </b></span>
              have many interesting combination of vitamins that helps the body produce chemicals which in-turn eases the PMS symptoms for women. High content of Folate in these seeds makes it a vital part of any pregnancy diet.
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

        {/* <div className={styles.periodScheduleTitle}>
          <span>
            <strong>PUMPKIN & FLAX SEEDS </strong>
          </span>
          <span>
            <strong>
              {" "}
              DAY- 1 TO{" "}
              {Math.floor(periodTrackedResultFromAPI.cycle_length / 2)}{" "}
            </strong>
          </span>
        </div>
        <div className={styles.notesSection}>
          <Notes
            heading="Pumpkin seeds"
            noteText="are rich in magnesium and calcium,therefore plays a major role in improving bone density especially during the menopause stage. These high fibre seeds also helps in overall weight management."
          />
        </div>
        <div className={styles.notesSection}>
          <Notes
            heading="Flax seeds"
            noteText="are known to boost women’s fertility by restoring hormone health and supporting ovulation. These seeds are often suggested to relieve constipation or bloating caused during periods."
          />
        </div>

        <div className={styles.periodScheduleTitle}>
          <span>
            <strong>SESAME & SUNFLOWER SEEDS</strong>
          </span>
          <span>
            <strong>
              {" "}
              DAY- {Math.floor(periodTrackedResultFromAPI.cycle_length / 2) +
                1}{" "}
              TO {periodTrackedResultFromAPI.cycle_length}{" "}
            </strong>
          </span>
        </div>
        <div className={styles.notesSection}>
          <Notes
            heading="Sesame seeds"
            noteText="are a high source of protein and iron which helps in improving the blood production. Minerals like magnesium and calcium in these seeds act as an antispasmodic properties. Helps in muscle relaxation and thus very beneficial during Menstrual cramps."
          />
        </div>
        <div className={styles.notesSection}>
          <Notes
            heading="Sunflower seeds"
            noteText="have many interesting combination of vitamins that helps the body produce chemicals which in-turn eases the PMS symptoms for women. High content of Folate in these seeds makes it a vital part of any pregnancy diet."
          />
        </div> */}
        <div className={styles.periodSubHeading}>
          <span>Disclamier</span>
          <ul>
            <li>
              Excess consumption of these seeds may cause vomiting, stomach ache
              and constipation for some people.
            </li>
            <li>
              Do not consume for more than 2 months without consulting a Doctor
              or Nutritionist.
            </li>
            <li>Avoid consuming if you are prone to ‘’heat causing foods’’.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default PeriodTrackerResult;
