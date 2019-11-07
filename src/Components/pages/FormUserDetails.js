import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

var selectedDate = new Date("2014-08-18T21:11:54");

const handleDateChange = date => {
  selectedDate = date;
};

class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { classes } = this.props;
    const { values, handleChange } = this.props;
    console.log(this.props.classes);
    return (
      <div>
        <Grid className={classes.Grid} container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              onChange={handleChange("firstName")}
              defaultValue={values.firstName}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              onChange={handleChange("lastName")}
              defaultValue={values.lastName}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
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
                value={this.selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
                className={classes.dates}
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
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
