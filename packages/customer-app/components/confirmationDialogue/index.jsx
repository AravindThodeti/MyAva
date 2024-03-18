import styles from "./Confirmation.module.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { func, bool,string } from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const propTypes = {
  /** function to close the dialogue */
  handleClose: func,
  /** state of the dialogue */
  open: bool,
  /** function to run on right button */
  rightFunction: func,
  /** function to run on left button click */
  leftFunction: func,
  /** message string*/
  message: string,
  /** alert message */
  alert: string,
  /**right button text */
  rightButton:string,
  /**left button text */
  leftButton:string
};

const ConfirmationDialogue = ({ handleClose, open, rightFunction, leftFunction,message ,alert,leftButton,rightButton}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className={styles.closeButton}>
            <IconButton
              style={{ padding: 0 }}
              aria-label="delete"
              size="medium"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className={styles.warningImage}>
            <img
              src="/assets/images/dietTracker/warningIcon.svg"
              alt="warning"
            />
          </div>
          <h1 className={styles.dialogueTitle} id="alert-dialog-title">
            {alert}
          </h1>
          <h1 className={styles.dialogueContent} id="alert-dialog-title">
            {message}
          </h1>
        </DialogContent>
        <div className={styles.dialogueActions}>
          <Button
            style={{
              width: "125px",
              height: "33px",
              backgroundColor: "white",
              color: "#949494",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "24px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.15)",
              textTransform: "none",
            }}
            onClick={leftFunction}
            color="primary"
          >
            {leftButton}
          </Button>
          <Button
            style={{
              width: "125px",
              height: "33px",
              background:
                "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%), linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "24px",
              textTransform: "none",
            }}
            onClick={rightFunction}
            color="primary"
            autoFocus
          >
            {rightButton}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
ConfirmationDialogue.propTypes = propTypes;
export default ConfirmationDialogue;
