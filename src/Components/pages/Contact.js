import React from "react";
import Button from "react-bootstrap/Button";
//import MaterialButton from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Alert } from "reactstrap";
import axios from "axios";

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import{
//     faInstagram,
//     faFacebook
// } from '@fortawesome/free-brands-svg-icons'
import SocialMedia from "../SocialMedia";

const initState = {
  name: "",
  email: "",
  message: "",
  disabled: false,
  emailSent: null,
  visible: false,
  nameErr: "",
  emailErr: "",
  messageErr: ""
};

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  onDismiss = () => this.setState(initState);

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  validate = () => {
    let nameErr = "";
    let emailErr = "";
    let messageErr = "";

    if (!this.state.name) {
      nameErr = "Name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailErr = "Invalid email";
    }

    if (this.state.message.length < 5) {
      messageErr = "Your message needs to be a bit bigger";
    }
    if (emailErr || nameErr || messageErr) {
      this.setState({ emailErr, nameErr, messageErr });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let data = {
        full_name: this.state.name,
        email: this.state.email,
        message: this.state.message
      };

      axios
        .post("https://vast-wave-57983.herokuapp.com/api/contacts", data)
        .then(res => console.log(res.data));
      this.setState(initState);
      this.setState({
        visible: true,
        disabled: true
      });
    }
  };

  // cyclically flushes out the dom
  render() {
    console.log(<p>yeet</p>);
    return (
      <div style={linkstyle}>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          <h4>Thank you!</h4>Your message has been sent, you should get an email
          within 2-3 business days
        </Alert>
        <h1>Contact Us</h1>
        <p style={{ fontSize: 14 }}>email: mickeyzacom@gmail.com</p>
        <p style={{ fontSize: 14 }}>phone: 555-444-3432</p>

        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="Full-name">Full Name</Form.Label>
              <Form.Control
                id="full-name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.nameErr}
            </div>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailErr}
            </div>
            <Form.Group>
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                id="message"
                name="message"
                as="textarea"
                rows="3"
                value={this.state.message}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.messageErr}
            </div>
            <Button
              className="d-inline-block"
              variant="primary"
              type="submit"
              disabled={this.state.disabled}
              //onClick={this.storeContact}
            >
              Send
            </Button>

            {this.state.emailSent === true && (
              <p className="d-inline success-msg">Email Sent</p>
            )}
            {this.state.emailSent === false && (
              <p className="d-inline err-msg">Email Not Sent</p>
            )}
          </Form>
        </Container>
        <SocialMedia />
      </div>
    );
  }
}
const linkstyle = {
  color: "#333",

  textDecoration: "none"
};

export default Contact;
