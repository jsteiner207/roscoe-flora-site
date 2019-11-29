import React from "react";
//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
//import { dark } from "@material-ui/core/styles/createPalette";
import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://roscoeflora.com/">
        roscoeflora
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/65918241_360494317945501_83873113493733376_n.jpg?_nc_cat=106&_nc_oc=AQm0zQ_gWiKCBRer_3YQdcWcmdq-v0gtknSb5BqN9JKLiOYYRflJCBvQr072zvevNB4&_nc_ht=scontent-ort2-2.xx&oh=e68af5c5176a0202902e30200db62e73&oe=5E2289C3)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignInSide() {
  const classes = useStyles();

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

  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState("");
  const [toDashboard, setToDashboard] = React.useState(false);
  const [helper, setHelper] = React.useState("");
  const [invalid, setInvalid] = React.useState("");

  const handleUserChange = e => {
    setUser(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const checkpassword = () => {
    axios
      .post(`https://vast-wave-57983.herokuapp.com/api/accounts/${user}`, {
        password: password
      })
      .then(res => {
        if (res.data.status === true) {
          let loggedIn = JSON.stringify({
            slate: "true"
          });
          localStorage.setItem("loggedIn", loggedIn);
          localStorage.setItem("user", user);
          setToDashboard(true);
        } else {
          setInvalid(true);
          setHelper("Incorrect username or password");
        }
      })
      .catch(err => console.log(err));
  };

  const theme = createMuiTheme({
    palette: {
      primary: red,
      type: "dark"
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      {toDashboard ? <Redirect to="/admin/dashboard" /> : null}

      {JSON.parse(localStorage.getItem("loggedIn")).slate === "true" ? (
        <Redirect to="/admin/dashboard" />
      ) : null}

      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography color="red" component="h1" variant="h4">
              Roscoe Flora Dashboard
            </Typography>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                helperText={helper}
                error={invalid}
                variant="outlined"
                margin="normal"
                value={user}
                onChange={handleUserChange}
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                helperText={helper}
                error={invalid}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </form>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={checkpassword}
            >
              Sign In
            </Button>
            {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body1">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}
