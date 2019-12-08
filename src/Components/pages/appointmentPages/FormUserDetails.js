import React, { Component } from "react";
// import AppBar from "@material-ui/core/AppBar";
// import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Form from "react-bootstrap/Form";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import PDF from "./Creating_an_Appointment.pdf";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { isNullLiteral } from "@babel/types";
import { isNull } from "util";

const styles = {
  root: {
    marginRight: 100,
    color: "#FFFFFF"
  },
  TextField: {
    top: 16
  },

  Grid: {
    maxWidth: 500
  },
  dates: {
    maxWidth: 200
  }
};

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class FormUserDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  state = {
    isError: false,
    emptyFirst: "",
    emptysecond: "",
    emptyEmail: "",
    emptyPhone: "",
    emptyDate: ""
  };

  continue = async e => {
    await this.setState({
      isError: false,
      isErrorFirst: false,
      isErrorLast: false,
      isErrorEmail: false,
      isErrorPhone: false,
      isErrorDate: false,
      emptyFirst: "",
      emptysecond: "",
      emptyEmail: "",
      emptyPhone: "",
      emptyDate: ""
    });
    e.preventDefault();
    if (this.props.values.firstName === "") {
      this.setState({ emptyFirst: "First Name Required" });
      this.setState({ isErrorFirst: true });
    }
    if (this.props.values.lastName === "") {
      this.setState({ emptysecond: "Last Name Required" });
      this.setState({ isErrorLast: true });
    }
    if (this.props.values.lastName === "Blocked") {
      this.setState({ emptysecond: "Nice try :)" });
      this.setState({ isErrorLast: true });
    }
    if (
      isNull(this.props.values.email.value) ||
      this.props.values.email.indexOf("@") === -1
    ) {
      this.setState({ emptyEmail: "Valid Email Required" });
      this.setState({ isErrorEmail: true });
    }
    if (this.props.values.phone.replace(/[^0-9]/g, "").length != 10) {
      this.setState({ emptyPhone: "Valid Phone Number Required" });
      this.setState({ isErrorPhone: true });
    }
    if (
      isNull(this.props.values.appDate.valueOf()) ||
      isNaN(this.props.values.appDate.valueOf())
    ) {
      this.setState({ emptyDate: "Invalid Date or Time" });
      this.setState({ isErrorDate: true });
    }
    if (
      !this.state.isErrorFirst &&
      !this.state.isErrorLast &&
      !this.state.isErrorEmail &&
      !this.state.isErrorPhone &&
      !this.state.isErrorDate
    ) {
      console.log(this.state.isError);
      this.props.nextStep();
    }
  };

  render() {
    const { classes } = this.props;
    const { values, handleChange, handleDateChange, bookedDates } = this.props;

    const disableWeekends = date => {
      let blocked = false;
      bookedDates.map(apps => {
        if (apps.getDate() === date.getDate())
          if (apps.getMonth() === date.getMonth()) blocked = true;
      });
      return blocked; //props.bookedDates.includes(date) //|| date.getDay() === 0 || date.getDay() === 6;
    };

    return (
      <div>
        <Grid className={classes.Grid} container spacing={1}>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="First Name"
              error={this.state.isErrorFirst}
              helperText={this.state.emptyFirst}
              onChange={handleChange("firstName")}
              value={values.firstName}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={this.state.isErrorLast}
              helperText={this.state.emptysecond}
              label="Last Name"
              onChange={handleChange("lastName")}
              value={values.lastName}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={this.state.isErrorEmail}
              helperText={this.state.emptyEmail}
              label="Email"
              type="email"
              onChange={handleChange("email")}
              value={values.email}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
                label="Phone Number"
                onChange={handleChange("phone")}
                value={values.phone}
                margin="normal"
              /> */}
            <FormControl className={classes.TextField}>
              <InputLabel htmlFor="formatted-text-mask-input">
                Phone Number
              </InputLabel>
              <Input
                error={this.state.isErrorPhone}
                value={values.phone}
                onChange={handleChange("phone")}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
              <FormHelperText error>{this.state.emptyPhone}</FormHelperText>
            </FormControl>
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                helperText={this.state.emptyDate}
                error={this.state.isError}
                shouldDisableDate={disableWeekends}
                minDate={moment().add(2, "days")}
                className={classes.dates}
                // disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={values.appDate}
                onChange={handleDateChange}
                initialFocusedDate={""}
                //emptyLabel= "Click the Icon"
                disablePast="true"
                maxDate={moment().add(90, "days")}
                invalidDateMessage="Invalid Date, please click the Icon"
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
                helperText={this.state.emptyDate}
                error={this.state.isErrorDate}
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
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.continue}
        >
          Continue
        </Button>
        <div>
          <a target="_blank" href={PDF}>
            Help
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FormUserDetails);
