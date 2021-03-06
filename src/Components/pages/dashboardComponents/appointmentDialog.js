import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";

import DeleteSnack from "./deletesnack";

export default function AppointmentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    first_name: "",
    last_name: ""
  });

  // updates the state after the component is rendered so the state isn't blank
  useEffect(() => {
    setState(props.appointment);
  }, [props.appointment]);

  const handleClickOpen = () => {
    deleteCard();
    setOpen(true);
    props.handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  // deletes item in the database
  const deleteCard = () => {
    axios
      .delete(`https://vast-wave-57983.herokuapp.com/api/items/${state}`)
      .then(console.log("success"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Dialog
        open={props.open}
        appointment={props.appointment}
        onClose={props.handleClose}
      >
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
