import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
    maxWidth: 500
  }
};

class FormPersonalDetails extends Component {
  state = {
    open: false,
    age: ""
  };

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

  // This closes up the selecter for dress changes
  handleClose = () => {
    this.setState({ open: false });
  };

  // This opens up the selecter for dress changes
  handleOpen = () => {
    this.setState({ open: true });
  };

  // This increments the steps opening up the previous form
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  // This decrements the steps opening up the previous form
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Grid className={classes.Grid} container spacing={1}>
            <Grid item xs={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  where would you like your photos taken
                </FormLabel>
                <RadioGroup aria-label="position" name="position" row>
                  <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="in-studio"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Radio color="primary" />}
                    label="location"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email"
                defaultValue={values.email}
                margin="normal"
              />
            </Grid>

            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">
                What type of photoshoot are you interested in{" "}
              </FormLabel>
              <RadioGroup aria-label="position" name="position" row>
                <FormControlLabel
                  value="headshot"
                  control={<Radio color="primary" />}
                  label="in-studio"
                  labelPlacement="Headshot"
                />
                <FormControlLabel
                  value="portraiture"
                  control={<Radio color="primary" />}
                  label="location"
                  labelPlacement="Portraiture"
                />
                <FormControlLabel
                  value="fashion"
                  control={<Radio color="primary" />}
                  label="location"
                  labelPlacement="Fashion"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl>
              <InputLabel id="demo-controlled-open-select-label">
                Dress changes
              </InputLabel>
              <Select
                className={classes.Selector}
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.age}
                onChange={this.handleChange}
              >
                <MenuItem value={0}></MenuItem>
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              className={classes.TextArea}
              id="outlined-multiline-static"
              label="Special requests"
              multiline
              rows="5"
              margin="normal"
              variant="outlined"
            />
            <br />

            <Button color="secondary" variant="contained" onClick={this.back}>
              Back
            </Button>

            <Button color="primary" variant="contained" onClick={this.continue}>
              Continue
            </Button>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FormPersonalDetails);
