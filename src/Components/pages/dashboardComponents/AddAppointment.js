import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import UpdateSnack from "./updatesnack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    location: "in-studio",
    address: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleDateChange = date => {
    try {
      setState({ ...state, appointment_date: date });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    axios.post(`https://vast-wave-57983.herokuapp.com/api/items/`, state);
    props.handleClose();
    setOpen(true); //this is for the snackbar
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
        <DialogTitle id="form-dialog-title">Add Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            From here you can add appointments
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
              select
              value={state.location}
              onChange={handleChange("location")}
            >
              <MenuItem value={"in-studio"}>in-studio</MenuItem>
              <MenuItem value={"out-of-studio"}>out-of-studio</MenuItem>
            </TextField>
            <TextField
              value={
                state.location === "in-studio"
                  ? "207 England Dr, O'Fallon MO"
                  : state.address
              }
              disabled={state.location === "in-studio" ? true : false}
              className={classes.textField}
              label="Address"
              margin="normal"
              onChange={handleChange("address")}
            />
            <TextField
              className={classes.textField}
              label="Service"
              select
              margin="normal"
              value={state.photoshoot_type}
              onChange={handleChange("photoshoot_type")}
            >
              <MenuItem value={"fashion"}>fashion</MenuItem>
              <MenuItem value={"headshot"}>headshot</MenuItem>
              <MenuItem value={"portraiture"}>portraiture</MenuItem>
            </TextField>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              select
              label="Dress changes"
              margin="normal"
              value={state.outfit_changes}
              onChange={handleChange("outfit_changes")}
            >
              <MenuItem value={0}></MenuItem>
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
            </TextField>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
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
