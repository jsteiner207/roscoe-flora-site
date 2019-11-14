import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  p: {
    fontSize: 20,

    padding: 30
  },
  root: {
    marginRight: 100,
    color: "#FFFFFF"
  },
  TextField: {
    marginRight: 25
  },
  Grid: {
    maxWidth: 600
  },
  dates: {
    maxWidth: 200
  }
};

class reschedule extends Component {
  render() {
    const { classes } = this.props;
    const { handleChange } = this.props;

    return (
      <div>
        <Grid className={classes.Grid} container spacing={4}>
          <Grid item xs={12}>
            <p className={classes.p}>
              If you have already made an appointment, enter the appointment id
              you received in the email if you need to make changes, reschedule,
              or cancel the appointment
            </p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="appointment id"
              onChange={handleChange("Appid")}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={this.props.onCancel}
            >
              Cancel appointment
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.props.onRetrieve}
            >
              reschedule appointment
            </Button>
          </Grid>
          <br />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(reschedule);
