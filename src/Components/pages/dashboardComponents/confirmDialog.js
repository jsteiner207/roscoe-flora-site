import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteCard = async () => {
    if (state.confirmed !== "true") {
      let daddy = {};
      await axios
        .get(
          `https://vast-wave-57983.herokuapp.com/api/items/${state.appointment_id}`
        )
        .then(res => {
          console.log();
          daddy = {
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email_name: res.data.email_name,
            phone_number: res.data.phone_number,
            outfit_changes: res.data.outfit_changes,
            photoshoot_type: res.data.photoshoot_type,
            location: res.data.location,
            address: res.data.address,
            special_requests: res.data.specrec,
            appointment_date: res.data.appointment_date,
            appointment_id: res.data.appointment_id
            //if updating, use default appid. otherwise, make one
          };
        });

      axios
        .post(`https://vast-wave-57983.herokuapp.com/email`, [
          daddy,
          { code: "confirm" }
        ])
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .put(
          `https://vast-wave-57983.herokuapp.com/api/items/${state.appointment_id}`,
          {
            confirmed: "true"
          }
        )
        .then(res => {
          setOpen(true);
          props.handleClose();
        })
        .catch(err => console.log(err));
    } else {
      axios
        .put(
          `https://vast-wave-57983.herokuapp.com/api/items/${state.appointment_id}`,
          {
            confirmed: "false"
          }
        )
        .then(res => {
          setOpen(true);
          props.handleClose();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        appointment={props.appointment}
        onClose={props.handleClose}
      >
        <DialogTitle>
          {state.confirmed !== "true"
            ? "Confirm this appointment?"
            : "Unconfirm this appointment"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickOpen} color="secondary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <span id="message-id">
            {state.confirmed !== "true"
              ? "Appointment Confirmed"
              : "Appointment Unconfirmed"}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
