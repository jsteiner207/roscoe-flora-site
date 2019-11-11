import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormPersonalDetails from "./FormPersonalDetails";
import Confirm from "./Confirm";
import Success from "./Success";
import { MuiThemeProvider } from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import red from "@material-ui/core/colors/red";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles({
  text: {
    backgroundColor: "lightgray",
    color: "black",
    minWidth: 275,
    marginRight: 50,
    marginTop: 60
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  right: {
    marginLeft: "auto",
    left: "20px"
  }
});
export default class UserForm extends Component {
  state = {
    step: 1,
    price: 0,
    updating: false,
    Appid: "",
    service: "",
    changes: "",
    location: "",
    address: "",
    photoType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specrec: "",
    appDate: new Date("2014-08-18T21:11:54")
  };

  handleDateChange = date => {
    try {
      date.setMinutes("00");
      this.setState({ appDate: date });
      console.log(this.state.appDate);
    } catch {
      console.log("d");
    }
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: orange,
      type: "light"
    }
  });

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      specrec,
      changes,
      address,
      location,
      appDate
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      phone,
      service,
      specrec,
      changes,
      address,
      location,
      appDate
    };

    switch (step) {
      case 1:
        return (
          <MuiThemeProvider theme={this.theme}>
            <FormUserDetails
              nextStep={this.nextStep}
              handleDateChange={this.handleDateChange}
              handleChange={this.handleChange}
              values={values}
            />
          </MuiThemeProvider>
        );
      case 2:
        console.log(this.state);
        return (
          <MuiThemeProvider theme={this.theme}>
            <FormPersonalDetails
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          </MuiThemeProvider>
        );
      case 3:
        console.log(this.state);
        return (
          <MuiThemeProvider theme={this.theme}>
            <Confirm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
          </MuiThemeProvider>
        );
      case 4:
        return <Success />;
    }
  }
}

// export default UserForm;
// import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import TextField from "@material-ui/core/TextField";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

// export default function MaterialUIPickers() {
//   // The first commit of Material-UI
//   const [selectedDate, setSelectedDate] = React.useState(
//     new Date("2014-08-18T21:11:54")
//   );

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justify="space-around">
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date-picker-inline"
//           label="Date picker inline"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             "aria-label": "change date"
//           }}
//         />
//         <KeyboardTimePicker
//           margin="normal"
//           id="time-picker"
//           label="Time picker"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             "aria-label": "change time"
//           }}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
