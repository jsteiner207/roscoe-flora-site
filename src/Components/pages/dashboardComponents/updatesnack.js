import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function SimpleSnackbar(props) {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //      }

  //     setOpen(false);
  //   };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={<span id="message-id">Appointment info updated</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
