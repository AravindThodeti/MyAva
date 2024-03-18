import React, { useRef, useEffect } from "react";
import styles from "./SquareDateItem.module.scss";
import { string, func, bool } from "prop-types";
import { useRouter } from "next/router";

const propTypes = {
  myClass: string,
  selectedDate: string,
  setSelectedDate: func,
  date: string,
  day: string,
  fullDate: string,
  dateScroll: bool,
};
const SquareDateItemWithDay = (
  {
    myClass,
    selectedDate,
    setSelectedDate,
    date,
    day,
    fullDate,
    dateScroll,
    disable,
  },
  props
) => {
  const router = useRouter();
  const dateRef = useRef();
  const handleClickDate = () => {
    setSelectedDate(fullDate);
    router.push({ query: { dietDate: fullDate } });
    console.log("propTypes", propTypes);
  };
  const isActive = selectedDate === fullDate;

  useEffect(() => {
    if (isActive && dateScroll === true) {
      dateRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "end",
      });
    }
  }, [dateScroll, isActive]);

  return (
    <div
      id={myClass}
      ref={dateRef}
      onClick={!disable && handleClickDate}
      className={`${isActive && styles.squareDateItemActive}  ${
        myClass == "periodTrackerBlack"
          ? styles.periodTrackerBlack
          : myClass == "periodTrackerPink"
          ? styles.periodTrackerPink
          : myClass == "periodTrackerDisable"
          ? styles.periodTrackerDisable
          : styles.squareDateItem
      }`}
    >
      <span
        data-testid="date-element"
        className={`${styles.date} ${
          isActive ? styles.dateActive : styles.dateInactive
        }`}
      >
        {date}
      </span>
      <span
        data-testid="day-element"
        className={`${styles.time} ${
          isActive ? styles.dayActive : styles.dayInactive
        }`}
      >
        {day}
      </span>
    </div>
  );
};

SquareDateItemWithDay.propTypes = propTypes;
export default SquareDateItemWithDay;
