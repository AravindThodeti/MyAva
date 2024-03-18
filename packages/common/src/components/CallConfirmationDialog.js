import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import { createCall } from "../store/actions/api.action";
import * as alertAction from "../store/actions/alert.action";
import { useSelector, useDispatch } from "react-redux";

export default function CallConfirmationDialog(props) {
  const { onClose, consultationId, open, ...other } = props;
  const dispatch = useDispatch();
  const callLoading = useSelector((state) => state.callReducer.loading);
  const error = useSelector((state) => state.callReducer.error);
  const call = useSelector((state) => state.callReducer.call);

  const handleCancel = () => {
    onClose();
  };
  const handleOk = () => {
    dispatch(createCall(consultationId));
  };

  React.useEffect(() => {
    if(error) {
      onClose();
    }
    if (open && call) {
      dispatch(alertAction.show('Call initiated with client.'));
      onClose();
    }

  }, [error, call])

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Call Client?</DialogTitle>
      {callLoading && (
        <DialogContent dividers>
          <CircularProgress />
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={handleCancel} disabled={callLoading} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} disabled={callLoading} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CallConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  consultationId: PropTypes.number.isRequired,
};
