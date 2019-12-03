import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [current, setCurrent] = React.useState("");
  const [match, setMatch] = React.useState("");
  const username = localStorage.getItem("user");
  const [state, setState] = React.useState({
    password: "",
    pass_2: "",
    pass_3: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleClickOpen = async () => {
    if (state.pass_2 === state.pass_3) {
      await axios
        .post(
          `https://vast-wave-57983.herokuapp.com/api/accounts/${username}`,
          state
        )
        .then(res => {
          if (res.data.status) {
            console.log("password correct");
            props.handleClose();
            setOpen(true);
            axios.put(
              `https://vast-wave-57983.herokuapp.com/api/accounts/${username}`,
              state
            );
          } else {
            //wrong password
            setError(true);
            setCurrent("Invalid Password");
          }
        });

      //this is for the snackbar
    } else {
      setError(true);
      setMatch("Passwords don't match");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles(theme => ({
    dialog: {
      width: 500,
      justify: "center"
    },
    container: {
      width: 500,
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
    <div container>
      <Dialog open={props.open} onClose={props.HandleClose}>
        <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            From here you can change your password
          </DialogContentText>

          <form className={classes.container}>
            <TextField
              className={classes.textField}
              label="Current Password"
              margin="normal"
              error={error}
              helperText={current}
              value={state.password}
              onChange={handleChange("password")}
            />
            <TextField
              className={classes.textField}
              label="New Password"
              error={error}
              helperText={match}
              margin="normal"
              value={state.pass_2}
              onChange={handleChange("pass_2")}
            />
            <TextField
              className={classes.textField}
              label="Confirm New Password"
              error={error}
              helperText={match}
              margin="normal"
              value={state.pass_3}
              onChange={handleChange("pass_3")}
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span id="message-id">Password Changed</span>}
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
