import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    // const { values, handleChange } = this.props;
    // const { classes } = this.props;
    switch (this.props.status) {
      case 1:
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <h1>Thank You For Your Submission</h1>

              <p>You will get an email with further instructions</p>
            </React.Fragment>
          </MuiThemeProvider>
        );
      case 2:
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <h1>Your appointment information has been updated</h1>
            </React.Fragment>
          </MuiThemeProvider>
        );
      case 3:
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <h1>You have successfully cancelled your appointment</h1>
            </React.Fragment>
          </MuiThemeProvider>
        );
    }
  }
}

export default Success;
