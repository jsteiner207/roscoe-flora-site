import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { MuiThemeProvider } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  Selector: {
    minWidth: 150
  },
  TextArea: {
    minWidth: 400
  },
  Grid: {
    maxWidth: 400
  }
};
class Confirm extends Component {
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
    const { classes } = this.props;
    const { values } = this.props;

    return (
      <MuiThemeProvider>
        <Grid className={classes.Grid} container spacing={1}>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="First Name"
                  secondary={values.firstName}
                />
              </ListItem>

              <ListItem>
                <ListItemText primary="email" secondary={values.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Location" secondary={values.location} />
              </ListItem>

              <ListItem>
                <ListItemText primary="Service" secondary={values.service} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Appointment Date"
                  secondary={values.appDate.toLocaleDateString("en-US")}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Estimated cost"
                  secondary={"$" + (150 + 30 * values.changes) + ".00"}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText primary="Last Name" secondary={values.lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone Number" secondary={values.phone} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="address"
                  secondary={
                    values.location === "in-studio"
                      ? "207 England Dr, O'Fallon MO"
                      : values.address
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Dress changes"
                  secondary={values.changes}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Appointment Time"
                  secondary={values.appDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Special Requests"
                  secondary={values.specrec}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Button color="secondary" variant="contained" onClick={this.back}>
          Back
        </Button>

        <Button color="primary" variant="contained" onClick={this.continue}>
          Confirm & Continue
        </Button>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Confirm);
