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

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  //const [appointment, setAppointment] = React.useState(props.appointment);
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
      <Dialog open={props.open} onClose={props.HandleClose}>
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
              value={props.appointment.first_name}
              //onChange={e => props._change(e)}
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
