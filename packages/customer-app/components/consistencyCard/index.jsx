import React from "react";
import styles from "./ConsistencyCard.module.scss";
import { string, bool, array } from "prop-types";
import { generateUuid } from "@/utils/UuidUtills";

const Badge = ({ day, isHighlighted }) => {
  return (
    <div className={styles.badge}>
      <span className={styles.day}>{day}</span>
      <div className={styles.badgeIcon}>
        <img
          src={`/assets/images/dietTracker/${
            isHighlighted ? "progressBadge" : "progressEmptyBadge"
          }.svg`}
        />
      </div>
    </div>
  );
};

Badge.propTypes = {
  day: string,
  isHighlighted: bool,
};

const ConsistencyCard = ({ dietConsistency }) => {
  return (
    <div className={styles.consistencyCard}>
      {dietConsistency.map(({ day_name, achieved }) => (
        <Badge
          key={generateUuid()}
          day={day_name.charAt(0).toUpperCase()}
          isHighlighted={achieved}
        />
      ))}
    </div>
  );
};

ConsistencyCard.propTypes = {
  dietConsistency: array,
};
export default ConsistencyCard;
