import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  try {
    if (JSON.parse(localStorage.getItem("loggedIn")).slate == null) {
      console.log("yeet");
    }
  } catch {
    let loggedIn = JSON.stringify({
      slate: "false"
    });
    localStorage.setItem("loggedIn", loggedIn);
  }

  const status = JSON.parse(localStorage.getItem("loggedIn"));

  const [signed, setSigned] = React.useState(status);

  const handleSignedChange = event => {
    setSigned(event.target.checked);
    let logged = JSON.stringify({
      slate: "false"
    });

    localStorage.setItem("loggedIn", logged);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {status.slate == "false" ? (
          <Redirect to="/admin/" />
        ) : (
          console.log(status)
        )}

        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography>logout</Typography>
          <Switch checked={signed} onChange={handleSignedChange} />
          <Typography variant="h6" className={classes.title}>
            Scheduled Appointments
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
