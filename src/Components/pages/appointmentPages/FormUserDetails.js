import React, { Component } from "react";
// import AppBar from "@material-ui/core/AppBar";
// import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const styles = {
  root: {
    marginRight: 100,
    color: "#FFFFFF"
  },
  TextField: {
    marginRight: 25
  },
  Grid: {
    maxWidth: 500
  },
  dates: {
    maxWidth: 200
  }
};

class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { classes } = this.props;
    const { values, handleChange, handleDateChange } = this.props;
    return (
      <div>
        <Grid className={classes.Grid} container spacing={1}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="First Name"
              onChange={handleChange("firstName")}
              value={values.firstName}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={handleChange("lastName")}
              value={values.lastName}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              onChange={handleChange("email")}
              value={values.email}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              onChange={handleChange("phone")}
              value={values.phone}
              margin="normal"
            />
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                className={classes.dates}
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={values.appDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
                className={classes.dates}
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={values.appDate}
                onChange={handleDateChange}
                minutesStep={15}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <br />
        <Button color="primary" variant="contained" onClick={this.continue}>
          Continue
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FormUserDetails);
