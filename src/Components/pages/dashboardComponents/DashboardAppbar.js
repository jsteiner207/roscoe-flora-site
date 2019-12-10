import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PDF from "./UserGuide.pdf";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Redirect } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PasswordDialog from "./PasswordDialog";
import AccountDialog from "./AccountDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    top: false
  });

  const handleClose = () => {
    setAnchorEl(null);
    setEdit(false);
    setAdd(false);
  };

  const editHandleClick = item => {
    setEdit(true);
  };

  const addHandleClick = item => {
    setAdd(true);
  };
  // this is used to toggle the drawer open and close
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  // this shows the content on the drawer

  const logText = tex => {
    props.setPage(tex);
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          "Appointments",
          "Customers",
          "Pricing",
          "Contact messages",
          "Gallery Management"
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => logText(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {status.slate === "false" ? (
          <Redirect to="/admin/" />
        ) : (
          console.log(status)
        )}

        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography>Logout</Typography>
          <Switch checked={signed} onChange={handleSignedChange} />
          <div>
            <a target="_blank" href={PDF}>
              Help
            </a>
          </div>
          <Typography variant="h6" className={classes.title}>
            {props.page}
          </Typography>
          <Typography align="right">{localStorage.getItem("user")}</Typography>

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
              <MenuItem onClick={editHandleClick}>change password</MenuItem>
              <MenuItem onClick={addHandleClick}>Add account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
      <PasswordDialog handleClose={handleClose} open={edit} />
      <AccountDialog handleClose={handleClose} open={add} />
    </div>
  );
}
