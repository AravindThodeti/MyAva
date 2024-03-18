import React, { useState } from "react";
import styles from "./TodoListItem.module.scss";
import { string } from "prop-types";

const propTypes = {
  /**task for the goal item */
  goalText: string,
  /**current status of the task */
  status: string,
};
const TodoListItem = ({ goalText, status }) => {
  const [taskStatus, setTaskStatus] = useState(status);
  const handleClick = () => {
    setTaskStatus((currentVal) => (currentVal === "done" ? "pending" : "done"));
  };
  return (
    <div className={styles.todoListItem}>
      <span className={styles.todoText}>{goalText}</span>

      {taskStatus === "done" ? (
        <img
          onClick={handleClick}
          src="/assets/images/dietTracker/checkedCheckbox.svg"
          alt="checked Ok"
        />
      ) : (
        <img
          onClick={handleClick}
          src="/assets/images/dietTracker/uncheckedCheckbox.svg"
          alt="cross"
        />
      )}
    </div>
  );
};
TodoListItem.propTypes = propTypes;
export default TodoListItem;
