import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import{
//     faInstagram,
//     faFacebook
// } from '@fortawesome/free-brands-svg-icons'
import SocialMedia from "../SocialMedia";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      disabled: false,
      emailSent: null
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  storeContact = () => {
    let data = {
      full_name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };

    axios
      .post("https://vast-wave-57983.herokuapp.com/api/contacts", data)
      .then(res => console.log(res.data));
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      disabled: true
    });
  };

  // cyclically flushes out the dom
  render() {
    return (
      <div style={linkstyle}>
        <h1>Contact Us</h1>

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

            <Button
              className="d-inline-block"
              variant="primary"
              type="submit"
              disabled={this.state.disabled}
              onClick={this.storeContact}
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
