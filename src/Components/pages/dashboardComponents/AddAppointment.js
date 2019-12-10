import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import UpdateSnack from "./updatesnack";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    isErrorFirst: false,
    firstMsg: "",
    isErrorLast: false,
    lastMsg: "",
    first_name: "",
    last_name: "",
    location: "in-studio",
    address: [],
    adder: "",
    appointment_id: "",
    appointment_date: new Date()
  });

  const removeAddress = index => {
    state.address.splice(index, 1);
    console.log(state.address);
    setState({ ...state, manips: state.address.length });
  };

  const generateKey = length => {
    let appId = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      appId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return appId;
  };
  const addItem = () => {
    if (state.address.length <= 3) {
      if (state.adder !== "")
        setState({
          ...state,
          address: [...state.address, state.adder],
          adder: ""
        }); //simple value
    }
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
    console.log(state);
  };

  const handleDateChange = date => {
    try {
      setState({ ...state, appointment_date: date });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = async () => {
    //setState({ ...state, appointment_id: generateKey(6) });
    if (state.first_name === "") {
      await setState({ isErrorFirst: true });
      console.log(state.isErrorFirst);
    }
    if (state.last_name === "") {
      await setState({ sErrorLast: true });
      console.log(state.isErrorLast);
    }
    console.log(state.isErrorLast + state.isErrorFirst);
    if (state.isErrorFirst === false && state.isErrorLast === false) {
      console.log(state);
      axios.post(`https://vast-wave-57983.herokuapp.com/api/items/`, {
        ...state,
        appointment_id: generateKey(6)
      });
      props.handleClose();
      setOpen(true); //this is for the snackba
    }
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
    },
    list: {
      margin: "auto",
      width: 260,
      right: 40
    },
    box: {
      width: 600
    },
    service: {
      bottom: 16,
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
              error={state.isErrorFirst}
              helperText={state.firstMsg}
              className={classes.textField}
              label="First Name"
              margin="normal"
              value={state.first_name}
              onChange={handleChange("first_name")}
            />
            <TextField
              error={state.isErrorLast}
              helperText={state.lastMsg}
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
            <List className={classes.list} container dense={true}>
              {state.location !== "in-studio" ? (
                state.address &&
                state.address.map((address, i) => (
                  <ListItem>
                    <ListItemText primary={address} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => removeAddress(i)} edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </List>
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
            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Photoshoot Address(s)
              </InputLabel>
              <Input
                value={
                  state.location === "in-studio"
                    ? "207 England Dr, O'Fallon MO"
                    : state.adder
                }
                disabled={state.location === "in-studio" ? true : false}
                onChange={handleChange("adder")}
                id="standard-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={addItem}
                      disabled={state.location === "in-studio" ? true : false}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

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
            <TextField
              className={classes.box}
              value={state.special_requests}
              onChange={handleChange("special_requests")}
              //id="outlined-multiline-static"
              //defaultValue={values.specrec}
              //onChange={handleChange("specrec")}
              label="Special requests"
              multiline
              rows="5"
              margin="normal"
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickOpen} color="primary">
            Confirm
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
        message={<span id="message-id">Appointment Created</span>}
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
      />{" "}
    </div>
  );
}
