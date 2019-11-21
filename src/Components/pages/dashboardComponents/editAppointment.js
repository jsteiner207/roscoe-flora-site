import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import UpdateSnack from "./updatesnack";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { ListItemSecondaryAction } from "@material-ui/core";

export default function FormDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    first_name: "",
    last_name: ""
  });

  // updates the state after the component is rendered so the state isn't blank
  useEffect(() => {
    setState(props.appointment)
    console.log(props.bookedDates)
  }, [props.appointment]);


  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  //const [firt, setFirst] = React.useState("john"); //props.appointment.first_name);

  function disableWeekends(date) {
    let blocked = false
    props.bookedDates.map(apps => {
      if (apps.getDate() === date.getDate())
        if (apps.getMonth() === date.getMonth())
          blocked = true;
    }
    );
    return blocked//props.bookedDates.includes(date) //|| date.getDay() === 0 || date.getDay() === 6;
  }

  const handleDateChange = date => {
    try {
      setState({ ...state, "appointment_date": date });
    } catch (err) {
      console.log(err)
    };
  }

  const handleClickOpen = () => {
    axios.put(
      `https://vast-wave-57983.herokuapp.com/api/items/${state.appointment_id}`,
      state
    );
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
        <DialogTitle id="form-dialog-title">Update Appointment Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            From here you can update information about this appointment.
          </DialogContentText>

          <form className={classes.container}>
            <TextField
              className={classes.textField}
              label="First Name"
              margin="normal"
              value={state.first_name}
              onChange={handleChange("first_name")}
            />
            <TextField
              className={classes.textField}
              label="Last Name"
              margin="normal"
              value={state.last_name}
              onChange={handleChange("last_name")}
            />
            <TextField
              className={classes.textField}
              label="email"
              margin="normal"
              value={state.email_name}
              onChange={handleChange("email_name")}

            />
            <TextField
              className={classes.textField}
              label="Phone Number"
              margin="normal"
              value={state.phone_number}
              onChange={handleChange("phone_number")}
            />
            <TextField
              className={classes.textField}
              label="Location"
              margin="normal"
              value={state.location}
              onChange={handleChange("location")}
            />
            <TextField
              className={classes.textField}
              label="Address"
              margin="normal"
              value={state.address}
              onChange={handleChange("address")}
            />
            <TextField
              className={classes.textField}
              label="Service"
              margin="normal"
              value={state.photoshoot_type}
              onChange={handleChange("photoshoot_type")}

            />
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="Dress changes"
              margin="normal"
              value={props.appointment.outfit_changes}
              onChange={handleChange("outfit_changes")}

            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                shouldDisableDate={disableWeekends}
                minDate={new Date()}
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={state.appointment_date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={state.appointment_date}
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
