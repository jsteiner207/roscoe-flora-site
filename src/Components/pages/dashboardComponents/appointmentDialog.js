import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import DeleteSnack from "./deletesnack";

export default function AppointmentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    props.handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{"Remove this appointment?"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickOpen} color="secondary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteSnack open={open} handleClose={handleClose} />
    </div>
  );
}
