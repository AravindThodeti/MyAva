import React, { useState } from "react";
import {
  required,
  Button,
  SaveButton,
  TextInput,
  useCreate,
  useNotify,
  FormWithRedirect,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

function PaymentCaptureButton() {
  const [showDialog, setShowDialog] = useState(false);
  const [create, { loading }] = useCreate("user_programs");
  const notify = useNotify();

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = async (values) => {
    values.type = "capture";
    create(
      { payload: { data: values } },
      {
        onSuccess: ({ data }) => {
          setShowDialog(false);
          notify('Payment captured. Please refresh', "success");
        },
        onFailure: ({ error }) => {
          notify(error.message, "error");
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleClick} label="Capture Payment">
        <MoneyOffIcon />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Capture Payment"
      >
        <DialogTitle>Capture Payment</DialogTitle>

        <FormWithRedirect
          resource="user_programs"
          save={handleSubmit}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>
                <TextInput
                  source="payment_id"
                  label="Razorpay Payment Id"
                  validate={required()}
                  fullWidth
                />
                <TextInput
                  label="Program Number"
                  type="number"
                  source="program_init_id"
                  validate={required()}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  label="ra.action.cancel"
                  onClick={handleCloseClick}
                  disabled={loading}
                >
                  <IconCancel />
                </Button>
                <SaveButton
                  handleSubmitWithRedirect={handleSubmitWithRedirect}
                  pristine={pristine}
                  saving={saving}
                  disabled={loading}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
}

export default PaymentCaptureButton;
