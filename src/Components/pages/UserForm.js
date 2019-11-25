import React, { Component } from "react";
import FormUserDetails from "./appointmentPages/FormUserDetails";
import FormPersonalDetails from "./appointmentPages/FormPersonalDetails";
import Confirm from "./appointmentPages/Confirm";
import Success from "./appointmentPages/Success";
import Reschedule from "./appointmentPages/reschedule";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import axios from "axios";
import red from "@material-ui/core/colors/red";
import { orange } from "@material-ui/core/colors";

export default class UserForm extends Component {
  state = {
    bookedDates: [new Date()],
    doc_id: "",
    step: 1,
    price: 0,
    status: 1,
    updating: false,
    Appid: "",
    service: "",
    changes: "",
    location: "",
    address: [],
    adder: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specrec: "",
    appDate: new Date("2019-11-25T21:11:54")
  };

  onCancel = async () => {
    await axios
      .get(
        `https://vast-wave-57983.herokuapp.com/api/items/${this.state.Appid}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          doc_id: res.data._id
        });
      });

    axios
      .delete(
        `https://vast-wave-57983.herokuapp.com/api/items/${this.state.doc_id}`
      )
      .then(console.log("success"))
      .catch(err => console.log(err));

    this.setState({ status: 3, step: 4 });
  };

  onRetrieve = () => {
    console.log(this.state.Appid);
    axios
      .get(
        `https://vast-wave-57983.herokuapp.com/api/items/${this.state.Appid}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          changes: res.data.outfit_changes,
          location: res.data.location,
          service: res.data.photoshoot_type,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email_name,
          phone: res.data.phone_number,
          address: res.data.address,
          specrec: res.data.special_requests,
          appDate: new Date(res.data.appointment_date),
          updating: true
        });
      });
    console.log(this.state.appDate);
    this.render();
    this.handleDateChange(this.state.appDate);
    this.setState({ status: 2 });
  };

  handleDateChange = date => {
    try {
      this.setState({ appDate: date });
      console.log(this.state.appDate);
    } catch {
      console.log("d");
    }
  };

  // This generates an appointment id for the customer
  generateKey = length => {
    let appId = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      appId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return appId;
  };

  onSubmit = () => {
    let data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email_name: this.state.email,
      phone_number: this.state.phone,
      outfit_changes: this.state.changes,
      photoshoot_type: this.state.service,
      location: this.state.location,
      address:
        this.state.location === "in-studio"
          ? "207 England Dr, O'Fallon MO"
          : this.state.address,
      special_requests: this.state.specrec,
      appointment_date: this.state.appDate,
      appointment_id: this.state.updating
        ? this.state.Appid
        : this.generateKey(6) //if updating, use default appid. otherwise, make one
    };

    if (this.state.updating === true) {
      axios.put(
        `https://vast-wave-57983.herokuapp.com/api/items/${this.state.Appid}`,
        data
      );
    } else {
      // stores the form data in the database
      axios
        .post(`https://vast-wave-57983.herokuapp.com/api/items`, data)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => console.log(err));

      axios
        .post(`https://vast-wave-57983.herokuapp.com/email`, data)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.setState({
      updating: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    });
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

  addItem = () => {
    this.setState({
      address: [...this.state.address, this.state.adder],
      adder: ""
    }); //simple value
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { bookedDates } = this.state;

    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      specrec,
      changes,
      address,
      adder,
      location,
      appDate,
      Appid
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
      adder,
      location,
      appDate,
      Appid
    };

    axios.get("https://vast-wave-57983.herokuapp.com/api/items").then(res => {
      this.setState({
        bookedDates: res.data.map(item => new Date(item.appointment_date))
      }); //gets the dates
    });

    switch (step) {
      case 1:
        return (
          <MuiThemeProvider theme={this.theme}>
            <Reschedule
              handleChange={this.handleChange}
              onRetrieve={this.onRetrieve}
              onCancel={this.onCancel}
              values={values}
            />

            <FormUserDetails
              bookedDates={this.state.bookedDates}
              nextStep={this.nextStep}
              handleDateChange={this.handleDateChange}
              handleChange={this.handleChange}
              values={values}
            />
          </MuiThemeProvider>
        );
      case 2:
        return (
          <MuiThemeProvider theme={this.theme}>
            <FormPersonalDetails
              addItem={this.addItem}
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
              onSubmit={this.onSubmit}
            />
          </MuiThemeProvider>
        );
      case 4:
        return <Success status={this.state.status} values={values} />;
      default:
        return <h1>An error has occured :(</h1>;
    }
  }
}
