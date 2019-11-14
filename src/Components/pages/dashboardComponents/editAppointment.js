import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import UpdateSnack from "./updatesnack";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  //const [firt, setFirst] = React.useState("john"); //props.appointment.first_name);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(props.appointment.appointment_date)
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleFirstChange = e => {
    console.log("yeet");
  };
  const handleClickOpen = () => {
    props.handleClose();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.HandleClose}
        appointment={props.appointment}
      >
        <DialogTitle id="form-dialog-title">Edit Appointment Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <form className={classes.container}>
            <TextField
              id="standard-basic"
              className={classes.textField}
              label="First Name"
              margin="normal"
              defaultValue={props.appointment.first_name}
              onChange={handleFirstChange}
            />
            <TextField
              id="filled-basic"
              className={classes.textField}
              label="Last Name"
              margin="normal"
              value={props.appointment.last_name}
            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="email"
              margin="normal"
              value={props.appointment.email_name}
            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Phone Number"
              margin="normal"
              value={props.appointment.phone_number}
            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Location"
              margin="normal"
              value={props.appointment.location}
            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="service"
              margin="normal"
              value={props.appointment.photoshoot_type}
            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Dress changes"
              margin="normal"
              value={props.appointment.outfit_changes}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={props.appointment.appointment_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={props.appointment.appointment_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickOpen} color="primary">
            Confrim
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateSnack open={open} handleClose={handleClose} />
    </div>
  );
}
